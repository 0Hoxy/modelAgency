/**
 * Step 3: 모델 정보 입력 폼 - Premium Mobile UI with i18n
 */
import {
  createDomesticModel,
  type CreateDomesticModelRequest,
  createGlobalModel,
  type CreateGlobalModelRequest,
  type ModelData,
  updateDomesticModel,
  type UpdateDomesticModelRequest,
  updateGlobalModel,
  type UpdateGlobalModelRequest,
} from '@api/models'
import { normalizeKrPhoneToE164, toLocalKrPhone } from '@utils/phone'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type {
  DomesticModelData,
  Gender,
  GlobalModelData,
  KoreanLevel,
  VisaType,
} from '../../types/registration'

const GENDER_OPTIONS_KO = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
  { value: 'OTHERS', label: '기타' },
]

const GENDER_OPTIONS_EN = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHERS', label: 'Others' },
]

const KOREAN_LEVEL_OPTIONS_KO = [
  { value: 'BAD', label: '낮음' },
  { value: 'NOT_BAD', label: '보통' },
  { value: 'GOOD', label: '좋음' },
  { value: 'VERY_GOOD', label: '매우 좋음' },
]

const KOREAN_LEVEL_OPTIONS_EN = [
  { value: 'BAD', label: 'Poor' },
  { value: 'NOT_BAD', label: 'Fair' },
  { value: 'GOOD', label: 'Good' },
  { value: 'VERY_GOOD', label: 'Excellent' },
]

const VISA_TYPE_OPTIONS_KO = [
  { value: 'C3', label: 'C3 - 단기방문' },
  { value: 'C4', label: 'C4 - 단기취업' },
  { value: 'E6', label: 'E6 - 예술흥행' },
  { value: 'E7', label: 'E7 - 특정활동' },
  { value: 'F2', label: 'F2 - 거주' },
  { value: 'F4', label: 'F4 - 재외동포' },
  { value: 'F5', label: 'F5 - 영주' },
  { value: 'F6', label: 'F6 - 결혼이민' },
  { value: 'H1', label: 'H1 - 관광취업' },
  { value: 'H2', label: 'H2 - 방문취업' },
  { value: 'D2', label: 'D2 - 유학' },
  { value: 'D4', label: 'D4 - 일반연수' },
  { value: 'D10', label: 'D10 - 구직' },
  { value: 'B1', label: 'B1 - 사증면제' },
  { value: 'B2', label: 'B2 - 관광통과' },
]

const VISA_TYPE_OPTIONS_EN = [
  { value: 'C3', label: 'C3 - Short-term Visit' },
  { value: 'C4', label: 'C4 - Short-term Employment' },
  { value: 'E6', label: 'E6 - Arts & Entertainment' },
  { value: 'E7', label: 'E7 - Specific Activities' },
  { value: 'F2', label: 'F2 - Residence' },
  { value: 'F4', label: 'F4 - Overseas Korean' },
  { value: 'F5', label: 'F5 - Permanent Residence' },
  { value: 'F6', label: 'F6 - Marriage Immigrant' },
  { value: 'H1', label: 'H1 - Working Holiday' },
  { value: 'H2', label: 'H2 - Working Visit' },
  { value: 'D2', label: 'D2 - Study' },
  { value: 'D4', label: 'D4 - General Training' },
  { value: 'D10', label: 'D10 - Job Seeker' },
  { value: 'B1', label: 'B1 - Visa Exemption' },
  { value: 'B2', label: 'B2 - Tourist Transit' },
]

const TEXTS = {
  domestic: {
    stepBadge: '국내 모델',
    title: (mode: string) => (mode === 'new' ? '신규 모델 등록' : '정보 수정'),
    basicInfo: '기본 정보',
    nameLabel: '이름',
    stageNameLabel: '예명/활동명',
    stageNamePlaceholder: '선택사항',
    birthLabel: '생년월일',
    genderLabel: '성별',
    phoneLabel: '전화번호',
    nationalityLabel: '국적',
    nationalityPlaceholder: '예: 대한민국',

    physicalInfo: '신체 정보',
    heightLabel: '키 (cm)',
    weightLabel: '체중 (kg)',
    topSizeLabel: '상의',
    bottomSizeLabel: '하의',
    shoesSizeLabel: '신발',

    agencyInfo: '소속사 정보',
    hasAgency: '소속사가 있습니다',
    agencyNameLabel: '소속사명',
    agencyNamePlaceholder: '소속사명 입력',
    managerNameLabel: '담당자 이름',
    managerNamePlaceholder: '1~3글자',
    managerPhoneLabel: '담당자 전화번호',

    snsInfo: 'SNS 정보',
    instagramLabel: '인스타그램',
    instagramPlaceholder: '@username',
    youtubeLabel: '유튜브',
    youtubePlaceholder: '채널명 또는 URL',

    tattooInfo: '타투 정보',
    hasTattoo: '타투가 있습니다',
    tattooLocationLabel: '타투 위치',
    tattooLocationPlaceholder: '예: 왼팔',
    tattooSizeLabel: '타투 크기',
    tattooSizePlaceholder: '예: 10cm',

    submitButton: (mode: string) => (mode === 'new' ? '등록하기' : '수정하기'),
    loadingButton: '처리 중...',

    alerts: {
      tattooRequired: '타투가 있는 경우 위치와 크기를 입력해주세요.',
      agencyRequired: '소속사가 있는 경우 소속사명을 입력해주세요.',
      registrationFailed: '등록에 실패했습니다. 다시 시도해주세요.',
    },
  },
  global: {
    stepBadge: 'Global Model',
    title: (mode: string) => (mode === 'new' ? 'New Model Registration' : 'Update Information'),
    basicInfo: 'Basic Information',
    nameLabel: 'Name',
    stageNameLabel: 'Stage Name',
    stageNamePlaceholder: 'Optional',
    birthLabel: 'Date of Birth',
    genderLabel: 'Gender',
    phoneLabel: 'Phone Number',
    nationalityLabel: 'Nationality',
    nationalityPlaceholder: 'e.g., USA',

    physicalInfo: 'Physical Information',
    heightLabel: 'Height (cm)',
    weightLabel: 'Weight (kg)',
    topSizeLabel: 'Top',
    bottomSizeLabel: 'Bottom',
    shoesSizeLabel: 'Shoes',

    additionalInfo: 'Additional Information',
    koreanLevelLabel: 'Korean Proficiency',
    visaTypeLabel: 'Visa Type',
    firstLanguageLabel: 'Native Language',
    firstLanguagePlaceholder: 'e.g., English',
    kakaotalkLabel: 'KakaoTalk ID',
    kakaotalkPlaceholder: 'KakaoTalk ID',

    snsInfo: 'Social Media',
    instagramLabel: 'Instagram',
    instagramPlaceholder: '@username',
    youtubeLabel: 'YouTube',
    youtubePlaceholder: 'Channel name or URL',

    tattooInfo: 'Tattoo Information',
    hasTattoo: 'I have tattoo(s)',
    tattooLocationLabel: 'Tattoo Location',
    tattooLocationPlaceholder: 'e.g., Left arm',
    tattooSizeLabel: 'Tattoo Size',
    tattooSizePlaceholder: 'e.g., 10cm',

    submitButton: (mode: string) => (mode === 'new' ? 'Register' : 'Update'),
    loadingButton: 'Processing...',

    alerts: {
      tattooRequired: 'Please provide tattoo location and size if you have tattoo(s).',
      registrationFailed: 'Registration failed. Please try again.',
    },
  },
}

export default function RegistrationForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const modelType = (searchParams.get('type') as 'domestic' | 'global') || 'domestic'
  const mode = (searchParams.get('mode') as 'new' | 'update') || 'new'
  const verification = location.state?.verification
  const existingModelData = location.state?.modelData as ModelData | undefined

  const t = TEXTS[modelType]
  const GENDER_OPTIONS = modelType === 'domestic' ? GENDER_OPTIONS_KO : GENDER_OPTIONS_EN
  const KOREAN_LEVEL_OPTIONS =
    modelType === 'domestic' ? KOREAN_LEVEL_OPTIONS_KO : KOREAN_LEVEL_OPTIONS_EN
  const VISA_TYPE_OPTIONS = modelType === 'domestic' ? VISA_TYPE_OPTIONS_KO : VISA_TYPE_OPTIONS_EN

  const [loading, setLoading] = useState(false)
  const [modelId] = useState<string | undefined>(existingModelData?.id)

  // UPDATE 모드면 기존 데이터로 초기화, CREATE 모드면 빈 폼
  const [formData, setFormData] = useState<Partial<DomesticModelData | GlobalModelData>>(() => {
    if (mode === 'update' && existingModelData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, is_foreigner, ...dataWithoutId } = existingModelData
      return {
        ...dataWithoutId,
        // Display local format phone on form
        phone: toLocalKrPhone(existingModelData.phone) || '',
        // Manager phone (domestic agency) also display as local format
        agency_manager_phone:
          toLocalKrPhone(
            (existingModelData as unknown as { agency_manager_phone?: string | null })
              .agency_manager_phone,
          ) ||
          (dataWithoutId as unknown as { agency_manager_phone?: string | undefined })
            .agency_manager_phone,
        is_foreigner: modelType === 'global',
      } as Partial<DomesticModelData | GlobalModelData>
    }

    // CREATE 모드 - 본인인증 정보만
    return {
      name: verification?.name || '',
      phone: verification?.phone || '',
      birth_date: verification?.birth || '',
      gender: 'MALE' as Gender,
      is_foreigner: modelType === 'global',
      has_tattoo: false,
      height: 0,
      ...(modelType === 'domestic'
        ? { has_agency: false }
        : { korean_level: 'GOOD' as KoreanLevel, visa_type: 'E6' as VisaType }),
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 필수 필드 검증
      if (!formData.name || !formData.phone || !formData.birth_date || !formData.height) {
        alert('필수 항목을 모두 입력해주세요.')
        setLoading(false)
        return
      }

      if (formData.has_tattoo && (!formData.tattoo_location || !formData.tattoo_size)) {
        alert(t.alerts.tattooRequired)
        setLoading(false)
        return
      }

      if (
        modelType === 'domestic' &&
        (formData as DomesticModelData).has_agency &&
        !(formData as DomesticModelData).agency_name
      ) {
        alert(TEXTS.domestic.alerts.agencyRequired)
        setLoading(false)
        return
      }

      // API 호출 - CREATE or UPDATE
      if (mode === 'update' && modelId) {
        // UPDATE 모드
        if (modelType === 'domestic') {
          const data = formData as DomesticModelData
          const requestData: UpdateDomesticModelRequest = {
            id: modelId,
            name: data.name || null,
            stage_name: data.stage_name || null,
            birth_date: data.birth_date || null,
            gender: data.gender || null,
            phone: data.phone ? normalizeKrPhoneToE164(data.phone) || null : null,
            nationality: data.nationality || null,
            instagram: data.instagram || null,
            youtube: data.youtube || null,
            address_city: data.address_city || null,
            address_district: data.address_district || null,
            address_street: data.address_street || null,
            special_abilities: data.special_abilities || null,
            other_languages: data.other_languages || null,
            has_tattoo: data.has_tattoo || null,
            tattoo_location: data.tattoo_location || null,
            tattoo_size: data.tattoo_size || null,
            height: data.height ? Number(data.height) : null,
            weight: data.weight ? Number(data.weight) : null,
            top_size: data.top_size || null,
            bottom_size: data.bottom_size || null,
            shoes_size: data.shoes_size || null,
            has_agency: data.has_agency || null,
            agency_name: data.agency_name || null,
            agency_manager_name: data.agency_manager_name || null,
            agency_manager_phone: data.agency_manager_phone || null,
            tictok: data.tictok || null,
          }
          await updateDomesticModel(requestData)
        } else {
          const data = formData as GlobalModelData
          const requestData: UpdateGlobalModelRequest = {
            id: modelId,
            name: data.name || null,
            stage_name: data.stage_name || null,
            birth_date: data.birth_date || null,
            gender: data.gender || null,
            phone: data.phone ? normalizeKrPhoneToE164(data.phone) || null : null,
            nationality: data.nationality || null,
            instagram: data.instagram || null,
            youtube: data.youtube || null,
            address_city: data.address_city || null,
            address_district: data.address_district || null,
            address_street: data.address_street || null,
            special_abilities: data.special_abilities || null,
            other_languages: data.other_languages || null,
            has_tattoo: data.has_tattoo || null,
            tattoo_location: data.tattoo_location || null,
            tattoo_size: data.tattoo_size || null,
            height: data.height ? Number(data.height) : null,
            weight: data.weight ? Number(data.weight) : null,
            top_size: data.top_size || null,
            bottom_size: data.bottom_size || null,
            shoes_size: data.shoes_size || null,
            kakaotalk: data.kakaotalk || null,
            first_language: data.first_language || null,
            korean_level: data.korean_level || null,
            visa_type: data.visa_type || null,
          }
          await updateGlobalModel(requestData)
        }
      } else {
        // CREATE 모드
        if (modelType === 'domestic') {
          const data = formData as DomesticModelData
          const requestData: CreateDomesticModelRequest = {
            name: data.name!,
            stage_name: data.stage_name || null,
            birth_date: data.birth_date!,
            gender: data.gender!,
            phone: normalizeKrPhoneToE164(data.phone!)!,
            nationality: data.nationality || null,
            instagram: data.instagram || null,
            youtube: data.youtube || null,
            address_city: data.address_city || null,
            address_district: data.address_district || null,
            address_street: data.address_street || null,
            special_abilities: data.special_abilities || null,
            other_languages: data.other_languages || null,
            has_tattoo: data.has_tattoo || false,
            tattoo_location: data.tattoo_location || null,
            tattoo_size: data.tattoo_size || null,
            height: Number(data.height),
            weight: data.weight ? Number(data.weight) : null,
            top_size: data.top_size || null,
            bottom_size: data.bottom_size || null,
            shoes_size: data.shoes_size || null,
            is_foreigner: false,
            has_agency: data.has_agency || false,
            agency_name: data.agency_name || null,
            agency_manager_name: data.agency_manager_name || null,
            agency_manager_phone: data.agency_manager_phone || null,
            tictok: data.tictok || null,
          }
          await createDomesticModel(requestData)
        } else {
          const data = formData as GlobalModelData
          const requestData: CreateGlobalModelRequest = {
            name: data.name!,
            stage_name: data.stage_name || null,
            birth_date: data.birth_date!,
            gender: data.gender!,
            phone: normalizeKrPhoneToE164(data.phone!)!,
            nationality: data.nationality!,
            instagram: data.instagram || null,
            youtube: data.youtube || null,
            address_city: data.address_city || null,
            address_district: data.address_district || null,
            address_street: data.address_street || null,
            special_abilities: data.special_abilities || null,
            other_languages: data.other_languages || null,
            has_tattoo: data.has_tattoo || false,
            tattoo_location: data.tattoo_location || null,
            tattoo_size: data.tattoo_size || null,
            height: Number(data.height),
            weight: data.weight ? Number(data.weight) : null,
            top_size: data.top_size || null,
            bottom_size: data.bottom_size || null,
            shoes_size: data.shoes_size || null,
            is_foreigner: true,
            kakaotalk: data.kakaotalk || null,
            first_language: data.first_language || null,
            korean_level: data.korean_level!,
            visa_type: data.visa_type!,
          }
          await createGlobalModel(requestData)
        }
      }

      // 성공 시 완료 페이지로 이동
      navigate(`/registration/complete?type=${modelType}`, {
        state: { modelName: formData.name, modelType },
      })
    } catch (error) {
      console.error('등록 실패:', error)
      const err = error as { response?: { data?: { detail?: string } } }
      const errorMessage = err?.response?.data?.detail || t.alerts.registrationFailed
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#e4e4e7',
    marginBottom: '10px',
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(9, 9, 11, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#ffffff',
    boxSizing: 'border-box' as const,
    outline: 'none',
    transition: 'all 0.2s ease',
  }

  const sectionStyle = {
    background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '24px 20px',
    marginBottom: '16px',
  }

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 20px 0',
    letterSpacing: '-0.3px',
  }

  const accentColor = modelType === 'domestic' ? '#6366f1' : '#a855f7'

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        paddingBottom: '100px',
        position: 'relative',
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            modelType === 'domestic'
              ? 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 고정 헤더 */}
      <div
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '40px',
              height: '40px',
              background: 'rgba(39, 39, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color="#ffffff" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: accentColor,
                  letterSpacing: '0.5px',
                }}
              >
                STEP 3
              </span>
              <span style={{ fontSize: '11px', color: '#52525b' }}>·</span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>{t.stepBadge}</span>
            </div>
            <h1 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
              {t.title(mode)}
            </h1>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 기본 정보 */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{t.basicInfo}</h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.nameLabel} *</label>
              <input
                type="text"
                value={formData.name || ''}
                disabled
                style={{
                  ...inputStyle,
                  background: 'rgba(9, 9, 11, 0.3)',
                  color: '#71717a',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.stageNameLabel}</label>
              <input
                type="text"
                placeholder={t.stageNamePlaceholder}
                value={formData.stage_name || ''}
                onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.birthLabel} *</label>
              <input
                type="date"
                value={formData.birth_date || ''}
                disabled
                style={{
                  ...inputStyle,
                  background: 'rgba(9, 9, 11, 0.3)',
                  color: '#71717a',
                  colorScheme: 'dark',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.genderLabel} *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                required
                style={inputStyle}
              >
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.phoneLabel} *</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={
                  mode === 'update'
                    ? { ...inputStyle, background: 'rgba(9, 9, 11, 0.3)', color: '#71717a' }
                    : inputStyle
                }
                disabled={mode === 'update'}
              />
            </div>

            <div>
              <label style={labelStyle}>{t.nationalityLabel}</label>
              <input
                type="text"
                placeholder={t.nationalityPlaceholder}
                value={formData.nationality || ''}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Address */}
            <div
              style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <div>
                <label style={labelStyle}>
                  {modelType === 'domestic' ? '주소 (시/도)' : 'Address City'}
                </label>
                <input
                  type="text"
                  placeholder={modelType === 'domestic' ? '예: 서울특별시' : 'e.g., Seoul'}
                  value={formData.address_city || ''}
                  onChange={(e) => setFormData({ ...formData, address_city: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  {modelType === 'domestic' ? '주소 (구/군)' : 'Address District'}
                </label>
                <input
                  type="text"
                  placeholder={modelType === 'domestic' ? '예: 강남구' : 'e.g., Gangnam-gu'}
                  value={formData.address_district || ''}
                  onChange={(e) => setFormData({ ...formData, address_district: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  {modelType === 'domestic' ? '주소 (상세 주소)' : 'Address Street'}
                </label>
                <input
                  type="text"
                  placeholder={
                    modelType === 'domestic'
                      ? '예: 테헤란로 123, 10층'
                      : 'e.g., Teheran-ro 123, 10F'
                  }
                  value={formData.address_street || ''}
                  onChange={(e) => setFormData({ ...formData, address_street: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* 신체 정보 */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{t.physicalInfo}</h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={labelStyle}>{t.heightLabel} *</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="175"
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.weightLabel}</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="65"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>{t.topSizeLabel}</label>
                <input
                  type="text"
                  placeholder="95"
                  value={formData.top_size || ''}
                  onChange={(e) => setFormData({ ...formData, top_size: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.bottomSizeLabel}</label>
                <input
                  type="text"
                  placeholder="30"
                  value={formData.bottom_size || ''}
                  onChange={(e) => setFormData({ ...formData, bottom_size: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.shoesSizeLabel}</label>
                <input
                  type="text"
                  placeholder="270"
                  value={formData.shoes_size || ''}
                  onChange={(e) => setFormData({ ...formData, shoes_size: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* 해외 모델 전용 */}
          {modelType === 'global' && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>{TEXTS.global.additionalInfo}</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{TEXTS.global.koreanLevelLabel} *</label>
                <select
                  value={(formData as GlobalModelData).korean_level}
                  onChange={(e) =>
                    setFormData({ ...formData, korean_level: e.target.value as KoreanLevel })
                  }
                  required
                  style={inputStyle}
                >
                  {KOREAN_LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{TEXTS.global.visaTypeLabel} *</label>
                <select
                  value={(formData as GlobalModelData).visa_type}
                  onChange={(e) =>
                    setFormData({ ...formData, visa_type: e.target.value as VisaType })
                  }
                  required
                  style={inputStyle}
                >
                  {VISA_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{TEXTS.global.firstLanguageLabel}</label>
                <input
                  type="text"
                  placeholder={TEXTS.global.firstLanguagePlaceholder}
                  value={(formData as GlobalModelData).first_language || ''}
                  onChange={(e) => setFormData({ ...formData, first_language: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Global: Other Languages */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Other Languages</label>
                <input
                  type="text"
                  placeholder="e.g., Japanese, Chinese"
                  value={formData.other_languages || ''}
                  onChange={(e) => setFormData({ ...formData, other_languages: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Global: Special Abilities */}
              <div>
                <label style={labelStyle}>Special Abilities</label>
                <input
                  type="text"
                  placeholder="e.g., Dance, Singing, Instruments"
                  value={formData.special_abilities || ''}
                  onChange={(e) => setFormData({ ...formData, special_abilities: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* KakaoTalk moved to SNS section to avoid duplication */}
            </div>
          )}

          {/* 국내 모델 전용 */}
          {modelType === 'domestic' && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>{TEXTS.domestic.agencyInfo}</h3>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: '#e4e4e7',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={(formData as DomesticModelData).has_agency}
                    onChange={(e) => setFormData({ ...formData, has_agency: e.target.checked })}
                    style={{ width: '20px', height: '20px', accentColor }}
                  />
                  {TEXTS.domestic.hasAgency}
                </label>
              </div>

              {(formData as DomesticModelData).has_agency && (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>{TEXTS.domestic.agencyNameLabel} *</label>
                    <input
                      type="text"
                      placeholder={TEXTS.domestic.agencyNamePlaceholder}
                      value={(formData as DomesticModelData).agency_name || ''}
                      onChange={(e) => setFormData({ ...formData, agency_name: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>{TEXTS.domestic.managerNameLabel}</label>
                    <input
                      type="text"
                      placeholder={TEXTS.domestic.managerNamePlaceholder}
                      value={(formData as DomesticModelData).agency_manager_name || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, agency_manager_name: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>{TEXTS.domestic.managerPhoneLabel}</label>
                    <input
                      type="tel"
                      placeholder="01012345678"
                      value={(formData as DomesticModelData).agency_manager_phone || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, agency_manager_phone: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* SNS 정보 */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{t.snsInfo}</h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{t.instagramLabel}</label>
              <input
                type="text"
                placeholder={t.instagramPlaceholder}
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>{t.youtubeLabel}</label>
              <input
                type="text"
                placeholder={t.youtubePlaceholder}
                value={formData.youtube || ''}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Domestic 전용: TikTok */}
            {modelType === 'domestic' && (
              <div style={{ marginTop: '16px' }}>
                <label style={labelStyle}>틱톡</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={(formData as DomesticModelData).tictok || ''}
                  onChange={(e) => setFormData({ ...formData, tictok: e.target.value })}
                  style={inputStyle}
                />
              </div>
            )}

            {/* Global 전용: KakaoTalk */}
            {modelType === 'global' && (
              <div style={{ marginTop: '16px' }}>
                <label style={labelStyle}>{TEXTS.global.kakaotalkLabel}</label>
                <input
                  type="text"
                  placeholder={TEXTS.global.kakaotalkPlaceholder}
                  value={(formData as GlobalModelData).kakaotalk || ''}
                  onChange={(e) => setFormData({ ...formData, kakaotalk: e.target.value })}
                  style={inputStyle}
                />
              </div>
            )}
          </div>

          {/* 추가 정보 - Domestic only */}
          {modelType === 'domestic' && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>
                {modelType === 'domestic' ? '추가 정보' : 'Additional Information'}
              </h3>

              {/* Domestic & Global: 기타 가능한 외국어 */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>
                  {modelType === 'domestic' ? '가능한 외국어' : 'Other Languages'}
                </label>
                <input
                  type="text"
                  placeholder={
                    modelType === 'domestic' ? '예: English, Japanese' : 'e.g., Japanese, Chinese'
                  }
                  value={formData.other_languages || ''}
                  onChange={(e) => setFormData({ ...formData, other_languages: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Domestic & Global: 특기 */}
              <div>
                <label style={labelStyle}>
                  {modelType === 'domestic' ? '특기' : 'Special Abilities'}
                </label>
                <input
                  type="text"
                  placeholder={
                    modelType === 'domestic'
                      ? '예: 춤, 노래, 악기'
                      : 'e.g., Dance, Singing, Instruments'
                  }
                  value={formData.special_abilities || ''}
                  onChange={(e) => setFormData({ ...formData, special_abilities: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* 타투 정보 */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{t.tattooInfo}</h3>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#e4e4e7',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.has_tattoo}
                  onChange={(e) => setFormData({ ...formData, has_tattoo: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor }}
                />
                {t.hasTattoo}
              </label>
            </div>

            {formData.has_tattoo && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>{t.tattooLocationLabel} *</label>
                  <input
                    type="text"
                    placeholder={t.tattooLocationPlaceholder}
                    value={formData.tattoo_location || ''}
                    onChange={(e) => setFormData({ ...formData, tattoo_location: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.tattooSizeLabel} *</label>
                  <input
                    type="text"
                    placeholder={t.tattooSizePlaceholder}
                    value={formData.tattoo_size || ''}
                    onChange={(e) => setFormData({ ...formData, tattoo_size: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 고정 하단 버튼 */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 20px',
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading
                  ? 'rgba(63, 63, 70, 0.5)'
                  : modelType === 'domestic'
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: loading
                  ? 'none'
                  : modelType === 'domestic'
                    ? '0 8px 24px rgba(99, 102, 241, 0.3)'
                    : '0 8px 24px rgba(168, 85, 247, 0.3)',
              }}
            >
              <Save size={20} />
              {loading ? t.loadingButton : t.submitButton(mode)}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
