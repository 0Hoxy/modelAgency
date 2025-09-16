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
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error),
)

export type HttpError = unknown

export const UserSchema = z.object({ id: z.number(), name: z.string() })
export const UsersSchema = z.array(UserSchema)


