// 모델 관리 API

import { del, get, post, put } from '@utils/http'

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
 * 국내 모델 등록 (일반 사용자용)
 * POST /models/domestic
 */
export async function createDomesticModel(
  data: CreateDomesticModelRequest,
): Promise<ModelResponse> {
  return post<ModelResponse>('/models/domestic', data)
}

/**
 * 해외 모델 등록 (일반 사용자용)
 * POST /models/global
 */
export async function createGlobalModel(data: CreateGlobalModelRequest): Promise<ModelResponse> {
  return post<ModelResponse>('/models/global', data)
}

/**
 * 국내 모델 등록 (관리자용)
 * POST /admins/models/domestic
 */
export async function createDomesticModelByAdmin(
  data: CreateDomesticModelRequest,
): Promise<ModelResponse> {
  return post<ModelResponse>('/admins/models/domestic', data)
}

/**
 * 해외 모델 등록 (관리자용)
 * POST /admins/models/global
 */
export async function createGlobalModelByAdmin(
  data: CreateGlobalModelRequest,
): Promise<ModelResponse> {
  return post<ModelResponse>('/admins/models/global', data)
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
  stage_name?: string | null
  gender: Gender
  birth_date: string
  phone: string
  nationality?: string | null
  address_city?: string | null
  address_district?: string | null
  address_street?: string | null
  instagram?: string | null
  youtube?: string | null
  tictok?: string | null
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
  is_foreigner?: boolean | null
  has_agency?: boolean | null
  agency_name?: string | null
  agency_manager_name?: string | null
  agency_manager_phone?: string | null
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
    models?: T[]
    total?: number
    count?: number
    total_count?: number
    page?: number
    page_size?: number
    total_pages?: number
  }
  const aliasPage = raw as AliasPage
  if (aliasPage && Array.isArray(aliasPage.items) && typeof aliasPage.total === 'number') {
    const totalPages =
      aliasPage.total_pages || Math.max(1, Math.ceil(aliasPage.total / params.page_size))
    return {
      data: aliasPage.items as T[],
      total: aliasPage.total as number,
      page: aliasPage.page ?? params.page,
      page_size: aliasPage.page_size ?? params.page_size,
      total_pages: totalPages,
    }
  }
  if (aliasPage && Array.isArray(aliasPage.results) && typeof aliasPage.count === 'number') {
    const totalPages =
      aliasPage.total_pages || Math.max(1, Math.ceil(aliasPage.count / params.page_size))
    return {
      data: aliasPage.results as T[],
      total: aliasPage.count as number,
      page: aliasPage.page ?? params.page,
      page_size: aliasPage.page_size ?? params.page_size,
      total_pages: totalPages,
    }
  }

  // Handle models array with total_count (API response format)
  if (aliasPage && Array.isArray(aliasPage.models) && typeof aliasPage.total_count === 'number') {
    const totalPages =
      aliasPage.total_pages || Math.max(1, Math.ceil(aliasPage.total_count / params.page_size))
    return {
      data: aliasPage.models as T[],
      total: aliasPage.total_count as number,
      page: aliasPage.page ?? params.page,
      page_size: aliasPage.page_size ?? params.page_size,
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

export interface DomesticSearchParams {
  page?: number
  page_size?: number
  name?: string
  gender?: string
  nationality?: string
  address_city?: string
  address_district?: string
  address_street?: string
  special_abilities?: string
  other_languages?: string
}

export async function getDomesticModels(
  params: DomesticSearchParams,
): Promise<PaginatedResponse<DomesticListItem>> {
  const raw = await get<unknown>('/admins/models/domestic', { params })
  // normalizePage 함수에 필요한 필수 파라미터 전달
  const normalizedParams = {
    page: params.page ?? 1,
    page_size: params.page_size ?? 20,
  }
  return normalizePage<DomesticListItem>(raw, normalizedParams)
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

export interface GlobalSearchParams {
  page?: number
  page_size?: number
  name?: string
  gender?: string
  nationality?: string
  address_city?: string
  address_district?: string
  address_street?: string | null
  special_abilities?: string
  other_languages?: string
  korean_level?: string
  visa_type?: string
}

export async function getGlobalModels(
  params: GlobalSearchParams,
): Promise<PaginatedResponse<GlobalListItem>> {
  const raw = await get<unknown>('/admins/models/global', { params })
  // normalizePage 함수에 필요한 필수 파라미터 전달
  const normalizedParams = {
    page: params.page ?? 1,
    page_size: params.page_size ?? 20,
  }
  return normalizePage<GlobalListItem>(raw, normalizedParams)
}

// ==================== 필터 옵션 조회 ====================

export interface FilterOption {
  label: string
  value: string
  description?: string // 설명 (한국어 능력, 비자 타입 등에 사용)
}

export interface AddressDistrictOption extends FilterOption {
  dongs: string[]
}

export interface AddressCityOption extends FilterOption {
  districts: AddressDistrictOption[]
}

export interface FilterOptionsResponse {
  nationalities: FilterOption[]
  specialties: FilterOption[]
  languages: FilterOption[]
  korean_levels: FilterOption[] // description 포함
  visa_types: FilterOption[] // description 포함
  address_cities: AddressCityOption[]
  metadata: {
    last_updated: string
    version: string
    total_counts: {
      nationalities: number
      specialties: number
      languages: number
      korean_levels: number
      visa_types: number
      address_cities: number
    }
  }
}

/**
 * 필터 옵션 조회
 * GET /admins/models/filter-options
 */
export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  const response = await get<FilterOptionsResponse>('/admins/models/filter-options')
  return response
}

/**
 * 주소 시/도 목록 조회
 * GET /admins/models/address/cities
 */
export async function getAddressCities(): Promise<AddressCityOption[]> {
  const response = await get<AddressCityOption[]>('/admins/models/address/cities')
  return response
}

/**
 * 특정 시/도의 구/군 목록 조회
 * GET /admins/models/address/districts?city={city}
 */
export async function getAddressDistricts(city: string): Promise<AddressDistrictOption[]> {
  const response = await get<AddressDistrictOption[]>(
    `/admins/models/address/districts?city=${encodeURIComponent(city)}`,
  )
  return response
}

/**
 * 특정 구/군의 동/면/읍 목록 조회
 * GET /admins/models/address/dongs?city={city}&district={district}
 */
export async function getAddressDongs(city: string, district: string): Promise<string[]> {
  const response = await get<string[]>(
    `/admins/models/address/dongs?city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}`,
  )
  return response
}

// ==================== 모델 상세 정보 조회 ====================

/**
 * 모델 신체 사이즈 정보 조회
 * GET /admins/models/{model_id}/physical
 */
export interface ModelPhysicalSize {
  id: string
  height?: number | null
  weight?: number | null
  top_size?: string | null
  bottom_size?: string | null
  shoes_size?: string | null
  has_tattoo?: boolean
  tattoo_location?: string | null
  tattoo_size?: string | null
  // 해외 모델 추가 정보
  visa_type?: VisaType | null
  korean_level?: KoreanLevel | null
}

export async function getModelPhysicalSize(modelId: string): Promise<ModelPhysicalSize> {
  return get<ModelPhysicalSize>(`/admins/models/${modelId}/physical`)
}

// ==================== 모델 삭제 ====================

/**
 * 국내 모델 삭제
 * DELETE /admins/models/{id}
 */
export async function deleteDomesticModel(id: string): Promise<void> {
  console.log('삭제 요청 ID:', id, '타입:', typeof id)
  return del(`/admins/models/${id}`)
}

/**
 * 해외 모델 삭제
 * DELETE /admins/models/{id}
 */
export async function deleteGlobalModel(id: string): Promise<void> {
  console.log('삭제 요청 ID:', id, '타입:', typeof id)
  return del(`/admins/models/${id}`)
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
 * 카메라테스트 등록 (관리자/디렉터용)
 * POST /admins/models/cameraTest
 */
export interface CameraTestCreateRequest {
  model_id: string // UUID
}

export interface CameraTestCreateResponse {
  id: number
  model_id: string
  is_tested: string // 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  visited_at: string // ISO datetime
}

export async function createCameraTest(
  data: CameraTestCreateRequest,
): Promise<CameraTestCreateResponse> {
  return post<CameraTestCreateResponse>('/admins/models/cameraTest', data)
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
