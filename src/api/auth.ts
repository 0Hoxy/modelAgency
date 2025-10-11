/**
 * Authentication API
 */
import { get, post, put } from '@utils/http'

// 사용자 역할
export type UserRole = 'ADMIN' | 'DIRECTOR'

// 가입 경로
export type Provider = 'LOCAL' | 'GOOGLE' | 'KAKAO' | 'NAVER'

// 사용자 정보 응답
export interface UserResponse {
  id: string // UUID
  name: string
  pid: string // 이메일
  role: UserRole
  provider: Provider
  created_at: string
}

// 로그인 요청 타입
export interface LoginRequest {
  pid: string // 이메일
  password: string
}

// 로그인 응답 타입
export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: UserResponse
}

// 회원가입 요청 타입 (관리자)
export interface SignupRequest {
  name: string
  pid: string // 이메일
  password: string // 8-20자
  role?: UserRole
  provider?: Provider
  provider_id?: string | null
}

// 회원가입 응답 타입
export type SignupResponse = UserResponse

// 리프레시 토큰 요청 타입
export interface RefreshTokenRequest {
  refresh_token: string
}

// 리프레시 토큰 응답 타입
export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

/**
 * 관리자 로그인
 * POST /accounts/login
 *
 * Note: 실제 상태 저장은 컴포넌트에서 useAuthStore를 사용
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await post<LoginResponse>('/accounts/login', data)
  return response
}

/**
 * 관리자 회원가입
 * POST /accounts/signup/admins
 */
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return post<SignupResponse>('/accounts/signup/admins', {
    ...data,
    role: 'ADMIN',
    provider: data.provider || 'LOCAL',
  })
}

/**
 * 토큰 갱신
 * POST /accounts/refresh
 */
export async function refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  return post<RefreshTokenResponse>('/accounts/refresh', data)
}

/**
 * 현재 사용자 정보 조회
 * GET /accounts/me
 */
export async function getCurrentUserInfo(): Promise<UserResponse> {
  return get<UserResponse>('/accounts/me')
}

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

/**
 * 비밀번호 변경
 * PUT /accounts/me/password
 */
export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  return put<void>('/accounts/me/password', data)
}

/**
 * @deprecated Use useAuthStore().logout() instead
 * 로그아웃 (하위 호환성을 위해 유지)
 */
export function logout(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
}

/**
 * @deprecated Use useAuthStore().user instead
 * 현재 사용자 정보 가져오기 (하위 호환성을 위해 유지)
 */
export function getCurrentUser(): UserResponse | null {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

/**
 * @deprecated Use useAuthStore().isAuthenticated instead
 * 로그인 여부 확인 (하위 호환성을 위해 유지)
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}
