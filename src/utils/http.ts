/**
 * utils/http: axios 기반 HTTP 유틸. 인스턴스/인터셉터 제공.
 */
import { refreshToken } from '@api/auth'
import { useAuthStore } from '@stores/authStore'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { z } from 'zod'

export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  // Zustand store에서 토큰 가져오기
  const authStorage = localStorage.getItem('auth-storage')
  let token: string | null = null

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage)
      token = parsed.state?.token
    } catch {
      // fallback to old method
      token = localStorage.getItem('token')
    }
  }

  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
    console.log('🔐 Token attached:', token.substring(0, 20) + '...')
  } else {
    console.warn('⚠️ No token found in storage')
  }

  return config
})

// 토큰 갱신 중인지 추적하는 플래그
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: string | null) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
}

http.interceptors.response.use(
  (res) => {
    console.log('✅ API Success:', res.config.url, res.status)
    return res
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    })

    // 401 에러이고 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중인 경우, 큐에 추가
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return http(originalRequest)
          })
          .catch((err: unknown) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 리프레시 토큰 가져오기
        const authStorage = localStorage.getItem('auth-storage')
        let refreshTokenValue: string | null = null

        if (authStorage) {
          try {
            const parsed = JSON.parse(authStorage)
            refreshTokenValue = parsed.state?.refreshToken
          } catch {
            // fallback
            refreshTokenValue = localStorage.getItem('refresh_token')
          }
        }

        if (!refreshTokenValue) {
          throw new Error('No refresh token available')
        }

        // 토큰 갱신 시도
        const response = await refreshToken({ refresh_token: refreshTokenValue })

        // 새로운 토큰 저장
        const newToken = response.access_token
        const newRefreshToken = response.refresh_token

        // Zustand store 업데이트
        useAuthStore.getState().updateTokens(newToken, newRefreshToken)

        // 큐 처리
        processQueue(null, newToken)

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return http(originalRequest)
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error('🔄 Token refresh failed:', refreshError)

        // Zustand store 로그아웃
        useAuthStore.getState().logout()

        // 큐 처리 (에러와 함께)
        processQueue(refreshError, null)

        // 로그인 페이지로 리다이렉트
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export type HttpError = AxiosError

export const UserSchema = z.object({ id: z.number(), name: z.string() })
export const UsersSchema = z.array(UserSchema)

// Data helpers (axios -> data)
export const get = async <T>(url: string, config?: Parameters<typeof http.get>[1]): Promise<T> => {
  const res = await http.get<T>(url, config)
  return res.data
}

export const post = async <T>(
  url: string,
  body?: unknown,
  config?: Parameters<typeof http.post>[2],
): Promise<T> => {
  const res = await http.post<T>(url, body, config)
  return res.data
}

export const put = async <T>(
  url: string,
  body?: unknown,
  config?: Parameters<typeof http.put>[2],
): Promise<T> => {
  const res = await http.put<T>(url, body, config)
  return res.data
}

export const del = async <T>(
  url: string,
  config?: Parameters<typeof http.delete>[1],
): Promise<T> => {
  const res = await http.delete<T>(url, config)
  return res.data
}
