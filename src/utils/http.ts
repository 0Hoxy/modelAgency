/**
 * utils/http: axios 기반 HTTP 유틸. 인스턴스/인터셉터 제공.
 */
import axios from 'axios'
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

http.interceptors.response.use(
  (res) => {
    console.log('✅ API Success:', res.config.url, res.status)
    return res
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    })
    return Promise.reject(error)
  },
)

export type HttpError = unknown

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
