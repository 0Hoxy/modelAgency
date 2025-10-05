/**
 * 모델 등록 관련 타입 정의
 */

export type ModelType = 'domestic' | 'global'

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

export interface VerificationData {
  name: string
  phone: string
  birth: string
}

export interface BaseModelData {
  name: string
  stage_name?: string
  birth_date: string
  gender: Gender
  phone: string
  nationality?: string
  instagram?: string
  youtube?: string
  address_city?: string
  address_district?: string
  address_street?: string
  special_abilities?: string
  other_languages?: string
  has_tattoo: boolean
  tattoo_location?: string
  tattoo_size?: string
  height: number
  weight?: number
  top_size?: string
  bottom_size?: string
  shoes_size?: string
  is_foreigner: boolean
}

export interface DomesticModelData extends BaseModelData {
  is_foreigner: false
  tiktok?: string
  has_agency: boolean
  agency_name?: string
  agency_manager_name?: string
  agency_manager_phone?: string
}

export interface GlobalModelData extends BaseModelData {
  is_foreigner: true
  kakaotalk?: string
  first_language?: string
  korean_level: KoreanLevel
  visa_type: VisaType
}

export type ModelFormData = DomesticModelData | GlobalModelData

export interface RegistrationResponse {
  name: string
  message: string
}
