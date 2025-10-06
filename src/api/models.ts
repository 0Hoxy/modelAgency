// 모델 관리 API

import { get, post, put } from '@utils/http'

// ==================== 타입 정의 ====================

export type Gender = 'MALE' | 'FEMALE' | 'OTHERS'
export type KoreanLevel = 'BAD' | 'NOT_BAD' | 'GOOD' | 'VERY_GOOD'
export type VisaType =
  | 'C1'
  | 'C2'
  | 'C3'
  | 'C4'
  | 'E1'
  | 'E2'
  | 'E3'
  | 'E4'
  | 'E5'
  | 'E6'
  | 'E7'
  | 'E8'
  | 'E9'
  | 'E10'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'H1'
  | 'H2'
  | 'D1'
  | 'D2'
  | 'D3'
  | 'D4'
  | 'D5'
  | 'D6'
  | 'D7'
  | 'D8'
  | 'D9'
  | 'D10'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'B1'
  | 'B2'

// ==================== 본인 인증 (재방문 확인) ====================

export interface RevisitVerificationRequest {
  name: string
  phone: string
  birth: string // YYYY-MM-DD format
}

export interface ModelData {
  id: string
  name: string
  stage_name?: string | null
  birth_date: string
  gender: Gender
  phone: string
  nationality?: string | null
  instagram?: string | null
  youtube?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  special_abilities?: string | null
  other_languages?: string | null
  has_tattoo?: boolean
  tattoo_location?: string | null
  tattoo_size?: string | null
  height?: number | null
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  is_foreigner: boolean
  // Domestic specific
  tictok?: string | null
  has_agency?: boolean
  agency_name?: string | null
  agency_manager_name?: string | null
  agency_manager_phone?: string | null
  // Global specific
  kakaotalk?: string | null
  first_language?: string | null
  korean_level?: KoreanLevel
  visa_type?: VisaType
}

export interface RevisitVerificationResponse {
  is_existing: boolean
  model_data?: ModelData
}

/**
 * 국내 모델 재방문 확인
 * POST /models/domestic/revisit-verification
 *
 * @returns 404 if not found (신규 등록), 200 if found (기존 등록 + 모델 데이터)
 */
export async function verifyDomesticRevisit(
  data: RevisitVerificationRequest,
): Promise<RevisitVerificationResponse> {
  try {
    const response = await post<ModelData>('/models/domestic/revisit-verification', data)
    // 200 OK = 기존 등록된 모델
    return { is_existing: true, model_data: response }
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } }
    if (err.response?.status === 404) {
      // 404 = 신규 모델
      return { is_existing: false }
    }
    throw error
  }
}

/**
 * 해외 모델 재방문 확인
 * POST /models/global/revisit-verification
 *
 * @returns 404 if not found (신규 등록), 200 if found (기존 등록 + 모델 데이터)
 */
export async function verifyGlobalRevisit(
  data: RevisitVerificationRequest,
): Promise<RevisitVerificationResponse> {
  try {
    const response = await post<ModelData>('/models/global/revisit-verification', data)
    // 200 OK = 기존 등록된 모델
    return { is_existing: true, model_data: response }
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } }
    if (err.response?.status === 404) {
      // 404 = 신규 모델
      return { is_existing: false }
    }
    throw error
  }
}

// ==================== 모델 등록 ====================

export interface CreateDomesticModelRequest {
  name: string
  stage_name?: string | null
  birth_date: string // YYYY-MM-DD
  gender: Gender
  phone: string
  nationality: string | null
  instagram?: string | null
  youtube?: string | null
  address_city: string | null
  address_district: string | null
  address_street: string | null
  special_abilities?: string | null
  other_languages?: string | null
  has_tattoo?: boolean
  tattoo_location?: string | null
  tattoo_size?: string | null
  height: number
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  is_foreigner: boolean
  has_agency?: boolean
  agency_name?: string | null
  agency_manager_name?: string | null
  agency_manager_phone?: string | null
  tictok?: string | null
}

export interface CreateGlobalModelRequest {
  name: string
  stage_name?: string | null
  birth_date: string // YYYY-MM-DD
  gender: Gender
  phone: string
  nationality: string
  instagram?: string | null
  youtube?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  special_abilities?: string | null
  other_languages?: string | null
  has_tattoo?: boolean
  tattoo_location?: string | null
  tattoo_size?: string | null
  height: number
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  is_foreigner: boolean
  kakaotalk?: string | null
  first_language?: string | null
  korean_level: KoreanLevel
  visa_type: VisaType
}

export interface ModelResponse {
  model_id: string
  name: string
  // ... 필요한 응답 필드 추가
}

/**
 * 국내 모델 등록
 * POST /models/domestic
 */
export async function createDomesticModel(
  data: CreateDomesticModelRequest,
): Promise<ModelResponse> {
  return post<ModelResponse>('/models/domestic', data)
}

/**
 * 해외 모델 등록
 * POST /models/global
 */
export async function createGlobalModel(data: CreateGlobalModelRequest): Promise<ModelResponse> {
  return post<ModelResponse>('/models/global', data)
}

// ==================== 모델 정보 수정 ====================

export interface UpdateDomesticModelRequest {
  id: string
  name?: string | null
  stage_name?: string | null
  birth_date?: string | null
  gender?: Gender | null
  phone?: string | null
  nationality?: string | null
  instagram?: string | null
  youtube?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  special_abilities?: string | null
  other_languages?: string | null
  has_tattoo?: boolean | null
  tattoo_location?: string | null
  tattoo_size?: string | null
  height?: number | null
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  has_agency?: boolean | null
  agency_name?: string | null
  agency_manager_name?: string | null
  agency_manager_phone?: string | null
  tictok?: string | null
}

export interface UpdateGlobalModelRequest {
  id: string
  name?: string | null
  stage_name?: string | null
  birth_date?: string | null
  gender?: Gender | null
  phone?: string | null
  nationality?: string | null
  instagram?: string | null
  youtube?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  special_abilities?: string | null
  other_languages?: string | null
  has_tattoo?: boolean | null
  tattoo_location?: string | null
  tattoo_size?: string | null
  height?: number | null
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  kakaotalk?: string | null
  first_language?: string | null
  korean_level?: KoreanLevel | null
  visa_type?: VisaType | null
}

/**
 * 국내 모델 정보 수정
 * PUT /models/domestic
 */
export async function updateDomesticModel(
  data: UpdateDomesticModelRequest,
): Promise<ModelResponse> {
  return put<ModelResponse>('/models/domestic', data)
}

/**
 * 해외 모델 정보 수정
 * PUT /models/global
 */
export async function updateGlobalModel(data: UpdateGlobalModelRequest): Promise<ModelResponse> {
  return put<ModelResponse>('/models/global', data)
}

// ==================== 모델 목록 조회 (관리자용) ====================

/**
 * 국내 모델 목록 조회
 * GET /models/domestic
 */
export interface DomesticListItem {
  id: string
  name: string
  gender: Gender
  birth_date: string
  phone: string
  height?: number | null
  nationality?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  instagram?: string | null
  youtube?: string | null
  tictok?: string | null
  has_agency?: boolean | null
  agency_name?: string | null
  agency_manager_name?: string | null
  agency_manager_phone?: string | null
  created_at?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// Normalize various backend pagination shapes into PaginatedResponse
function normalizePage<T>(
  raw: unknown,
  params: { page: number; page_size: number },
): PaginatedResponse<T> {
  // If server already returns our shape
  const asOur = raw as Partial<PaginatedResponse<T>>
  if (Array.isArray(asOur?.data) && typeof asOur?.total === 'number') {
    return {
      data: asOur.data as T[],
      total: asOur.total as number,
      page: asOur.page ?? params.page,
      page_size: asOur.page_size ?? params.page_size,
      total_pages:
        asOur.total_pages ??
        Math.max(1, Math.ceil((asOur.total as number) / (asOur.page_size ?? params.page_size))),
    }
  }

  // Common aliases
  type AliasPage = {
    items?: T[]
    results?: T[]
    total?: number
    count?: number
    page?: number
    page_size?: number
    total_pages?: number
  }
  const anyRaw = raw as AliasPage
  if (anyRaw && Array.isArray(anyRaw.items) && typeof anyRaw.total === 'number') {
    const totalPages = anyRaw.total_pages || Math.max(1, Math.ceil(anyRaw.total / params.page_size))
    return {
      data: anyRaw.items as T[],
      total: anyRaw.total as number,
      page: anyRaw.page ?? params.page,
      page_size: anyRaw.page_size ?? params.page_size,
      total_pages: totalPages,
    }
  }
  if (anyRaw && Array.isArray(anyRaw.results) && typeof anyRaw.count === 'number') {
    const totalPages = anyRaw.total_pages || Math.max(1, Math.ceil(anyRaw.count / params.page_size))
    return {
      data: anyRaw.results as T[],
      total: anyRaw.count as number,
      page: anyRaw.page ?? params.page,
      page_size: anyRaw.page_size ?? params.page_size,
      total_pages: totalPages,
    }
  }

  // If server returns a bare array, synthesize pagination
  if (Array.isArray(raw)) {
    const arr = raw as T[]
    const start = (params.page - 1) * params.page_size
    const slice = arr.slice(start, start + params.page_size)
    return {
      data: slice,
      total: arr.length,
      page: params.page,
      page_size: params.page_size,
      total_pages: Math.max(1, Math.ceil(arr.length / params.page_size)),
    }
  }

  // Fallback to empty page
  return {
    data: [],
    total: 0,
    page: params.page,
    page_size: params.page_size,
    total_pages: 1,
  }
}

export async function getDomesticModels(params: {
  page: number
  page_size: number
  // optional filters can be added here later
}): Promise<PaginatedResponse<DomesticListItem>> {
  const raw = await get<unknown>('/models/domestic', { params })
  return normalizePage<DomesticListItem>(raw, params)
}

// ==================== 해외 모델 목록 ====================
export interface GlobalListItem {
  id: string
  name: string
  gender: Gender
  birth_date: string
  phone: string
  nationality: string
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  instagram?: string | null
  youtube?: string | null
  korean_level?: KoreanLevel | null
  visa_type?: VisaType | null
  created_at?: string
}

export async function getGlobalModels(params: {
  page: number
  page_size: number
}): Promise<PaginatedResponse<GlobalListItem>> {
  const raw = await get<unknown>('/models/global', { params })
  return normalizePage<GlobalListItem>(raw, params)
}

// ==================== 카메라테스트 목록 조회 ====================

export interface CameraTestListItem {
  id: string
  name: string
  birth_date: string
  nationality?: string | null
  height?: number | null
  agency_name?: string | null
  visa_type?: string | null
  // 서버가 상태/시간을 제공할 수 있으므로 옵셔널로 둔다
  status?: string | null
  test_time?: string | null
  is_tested?: boolean | null
}

/**
 * 카메라테스트 목록 조회 (모델당 1건, 가장 이른 방문)
 * GET /admins/models/cameraTest?target_date=YYYY-MM-DD
 */
export async function getCameraTestList(params: {
  target_date?: string | null
}): Promise<CameraTestListItem[]> {
  const response = await get<CameraTestListItem[] | { items: CameraTestListItem[] }>(
    '/admins/models/cameraTest',
    { params },
  )
  if (Array.isArray(response)) return response
  if (response && Array.isArray((response as { items?: CameraTestListItem[] }).items)) {
    return (response as { items: CameraTestListItem[] }).items
  }
  return []
}

/**
 * 카메라테스트 상태 변경
 * PUT /admins/models/{model_id}/cameraTest
 * Body: { status: string }
 */
export async function updateCameraTestStatus(params: {
  id: string | number
  status: string
}): Promise<CameraTestListItem> {
  return put<CameraTestListItem>(`/admins/models/${params.id}/cameraTest`, {
    status: params.status,
  })
}
