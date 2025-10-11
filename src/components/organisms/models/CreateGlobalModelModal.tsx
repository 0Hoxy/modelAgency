/**
 * CreateGlobalModelModal: 해외모델 등록 모달
 */
import { TextField } from '@molecules/TextField'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ReactNode, useState } from 'react'

import type { CreateGlobalModelRequest, Gender, KoreanLevel, VisaType } from '../../../api/models'
import { createGlobalModelByAdmin } from '../../../api/models'

type CreateGlobalModelModalProps = {
  trigger?: ReactNode
  onSuccess?: () => void
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
  { value: 'OTHERS', label: '기타' },
]

const KOREAN_LEVEL_OPTIONS: { value: KoreanLevel; label: string }[] = [
  { value: 'BAD', label: '초급' },
  { value: 'NOT_BAD', label: '중급' },
  { value: 'GOOD', label: '고급' },
  { value: 'VERY_GOOD', label: '원어민 수준' },
]

const VISA_TYPE_OPTIONS: { value: VisaType; label: string }[] = [
  { value: 'C1', label: 'C-1 (일시취재)' },
  { value: 'C3', label: 'C-3 (단기방문)' },
  { value: 'C4', label: 'C-4 (단기취업)' },
  { value: 'E6', label: 'E-6 (예술흥행)' },
  { value: 'E7', label: 'E-7 (특정활동)' },
  { value: 'F2', label: 'F-2 (거주)' },
  { value: 'F4', label: 'F-4 (재외동포)' },
  { value: 'F5', label: 'F-5 (영주)' },
  { value: 'F6', label: 'F-6 (결혼이민)' },
  { value: 'H2', label: 'H-2 (방문취업)' },
  { value: 'D2', label: 'D-2 (유학)' },
  { value: 'D4', label: 'D-4 (일반연수)' },
  { value: 'D10', label: 'D-10 (구직)' },
]

export function CreateGlobalModelModal({ trigger, onSuccess }: CreateGlobalModelModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 필수 필드
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<Gender>('MALE')
  const [phone, setPhone] = useState('')
  const [height, setHeight] = useState('')
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevel>('NOT_BAD')
  const [visaType, setVisaType] = useState<VisaType>('E6')

  // 선택 필드 - 기본 정보
  const [stageName, setStageName] = useState('')
  const [nationality, setNationality] = useState('')
  const [isForeigner, setIsForeigner] = useState(true) // 해외모델은 기본적으로 외국인

  // SNS
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [kakaotalk, setKakaotalk] = useState('')

  // 주소
  const [addressCity, setAddressCity] = useState('')
  const [addressDistrict, setAddressDistrict] = useState('')
  const [addressStreet, setAddressStreet] = useState('')

  // 언어/특기
  const [firstLanguage, setFirstLanguage] = useState('')
  const [otherLanguages, setOtherLanguages] = useState('')
  const [specialAbilities, setSpecialAbilities] = useState('')

  // 타투
  const [hasTattoo, setHasTattoo] = useState(false)
  const [tattooLocation, setTattooLocation] = useState('')
  const [tattooSize, setTattooSize] = useState('')

  // 신체 정보
  const [weight, setWeight] = useState('')
  const [topSize, setTopSize] = useState('')
  const [bottomSize, setBottomSize] = useState('')
  const [shoesSize, setShoesSize] = useState('')

  const resetForm = () => {
    setName('')
    setBirthDate('')
    setGender('MALE')
    setPhone('')
    setHeight('')
    setKoreanLevel('NOT_BAD')
    setVisaType('E6')
    setStageName('')
    setNationality('')
    setIsForeigner(true)
    setInstagram('')
    setYoutube('')
    setKakaotalk('')
    setAddressCity('')
    setAddressDistrict('')
    setAddressStreet('')
    setFirstLanguage('')
    setOtherLanguages('')
    setSpecialAbilities('')
    setHasTattoo(false)
    setTattooLocation('')
    setTattooSize('')
    setWeight('')
    setTopSize('')
    setBottomSize('')
    setShoesSize('')
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 필수 필드 검증
    if (!name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }
    if (!birthDate) {
      setError('생년월일을 입력해주세요.')
      return
    }
    if (!phone.trim()) {
      setError('전화번호를 입력해주세요.')
      return
    }
    if (!height || Number(height) <= 0) {
      setError('키를 입력해주세요.')
      return
    }
    if (!nationality.trim()) {
      setError('국적을 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const requestData: CreateGlobalModelRequest = {
        name: name.trim(),
        stage_name: stageName.trim() || null,
        birth_date: birthDate,
        gender,
        phone: phone.trim(),
        nationality: nationality.trim(),
        instagram: instagram.trim() || null,
        youtube: youtube.trim() || null,
        kakaotalk: kakaotalk.trim() || null,
        address_city: addressCity.trim() || null,
        address_district: addressDistrict.trim() || null,
        address_street: addressStreet.trim() || null,
        first_language: firstLanguage.trim() || null,
        other_languages: otherLanguages.trim() || null,
        special_abilities: specialAbilities.trim() || null,
        has_tattoo: hasTattoo,
        tattoo_location: hasTattoo ? tattooLocation.trim() || null : null,
        tattoo_size: hasTattoo ? tattooSize.trim() || null : null,
        height: Number(height),
        weight: weight ? Number(weight) : null,
        top_size: topSize.trim() || null,
        bottom_size: bottomSize.trim() || null,
        shoes_size: shoesSize.trim() || null,
        is_foreigner: isForeigner,
        korean_level: koreanLevel,
        visa_type: visaType,
      }

      await createGlobalModelByAdmin(requestData)

      resetForm()
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      console.error('해외모델 등록 실패:', err)
      const error = err as { response?: { data?: { detail?: string } }; message?: string }
      setError(error?.response?.data?.detail || error?.message || '등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultTrigger = (
    <button
      type="button"
      className="iconBtn"
      style={{
        border: 'none',
        background: 'transparent',
        color: '#374151',
        borderRadius: 6,
        transition: 'color 160ms ease',
        padding: '4px 8px',
        cursor: 'pointer',
        fontSize: '13px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#111827'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#374151'
      }}
    >
      모델 등록
    </button>
  )

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{trigger || defaultTrigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        />
        <DialogPrimitive.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#ffffff',
            borderRadius: 16,
            width: 'min(900px, 95vw)',
            maxHeight: '90vh',
            padding: 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.05)',
            zIndex: 51,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #f1f5f9',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '24px 32px',
              borderBottom: '1px solid #f1f5f9',
              background: '#fafafa',
            }}
          >
            <DialogPrimitive.Title
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 600,
                color: '#0f172a',
                letterSpacing: '-0.01em',
              }}
            >
              해외모델 등록
            </DialogPrimitive.Title>
            <DialogPrimitive.Description
              style={{
                marginTop: 4,
                color: '#64748b',
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              필수 항목을 입력해주세요
            </DialogPrimitive.Description>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              overflow: 'auto',
              flex: 1,
              padding: '32px',
            }}
          >
            <div style={{ display: 'grid', gap: 32 }}>
              {/* 기본 정보 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  기본 정보
                </h3>
                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                  <TextField
                    label="이름 *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  <TextField
                    label="예명"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="Rainbow"
                  />
                  <TextField
                    label="생년월일 *"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 8,
                        color: '#0f172a',
                      }}
                    >
                      성별 *
                    </label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {GENDER_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={gender === option.value}
                            onChange={(e) => setGender(e.target.value as Gender)}
                          />
                          <span style={{ fontSize: 14 }}>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <TextField
                    label="전화번호 *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+821012345678"
                    required
                  />
                  <TextField
                    label="국적 *"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="USA"
                    required
                  />
                </div>
              </section>

              {/* 비자 및 한국어 수준 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  비자 및 언어
                </h3>
                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 8,
                        color: '#0f172a',
                      }}
                    >
                      비자 종류 *
                    </label>
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value as VisaType)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        fontSize: 14,
                      }}
                      required
                    >
                      {VISA_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 8,
                        color: '#0f172a',
                      }}
                    >
                      한국어 수준 *
                    </label>
                    <select
                      value={koreanLevel}
                      onChange={(e) => setKoreanLevel(e.target.value as KoreanLevel)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        fontSize: 14,
                      }}
                      required
                    >
                      {KOREAN_LEVEL_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    label="모국어"
                    value={firstLanguage}
                    onChange={(e) => setFirstLanguage(e.target.value)}
                    placeholder="English"
                  />
                  <TextField
                    label="기타 언어"
                    value={otherLanguages}
                    onChange={(e) => setOtherLanguages(e.target.value)}
                    placeholder="Spanish, French"
                  />
                </div>
              </section>

              {/* SNS */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  SNS
                </h3>
                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                  <TextField
                    label="인스타그램"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@username"
                  />
                  <TextField
                    label="유튜브"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="@channel"
                  />
                  <TextField
                    label="카카오톡"
                    value={kakaotalk}
                    onChange={(e) => setKakaotalk(e.target.value)}
                    placeholder="KakaoTalk ID"
                  />
                </div>
              </section>

              {/* 주소 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  주소
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                    <TextField
                      label="시/도"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      placeholder="서울특별시"
                    />
                    <TextField
                      label="구/군"
                      value={addressDistrict}
                      onChange={(e) => setAddressDistrict(e.target.value)}
                      placeholder="강남구"
                    />
                  </div>
                  <TextField
                    label="상세 주소"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    placeholder="역삼동 123-45"
                  />
                </div>
              </section>

              {/* 특기 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  특기
                </h3>
                <TextField
                  label="특기"
                  value={specialAbilities}
                  onChange={(e) => setSpecialAbilities(e.target.value)}
                  placeholder="Dance, Singing, Acting"
                />
              </section>

              {/* 타투 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  타투
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={hasTattoo}
                      onChange={(e) => setHasTattoo(e.target.checked)}
                    />
                    <span style={{ fontSize: 14 }}>타투 있음</span>
                  </label>
                  {hasTattoo && (
                    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                      <TextField
                        label="위치"
                        value={tattooLocation}
                        onChange={(e) => setTattooLocation(e.target.value)}
                        placeholder="Arm, Back"
                      />
                      <TextField
                        label="크기"
                        value={tattooSize}
                        onChange={(e) => setTattooSize(e.target.value)}
                        placeholder="5cm x 5cm"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* 신체 정보 */}
              <section>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  신체 정보
                </h3>
                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                  <TextField
                    label="키 (cm) *"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    required
                  />
                  <TextField
                    label="몸무게 (kg)"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="60"
                  />
                  <TextField
                    label="상의 사이즈"
                    value={topSize}
                    onChange={(e) => setTopSize(e.target.value)}
                    placeholder="M"
                  />
                  <TextField
                    label="하의 사이즈"
                    value={bottomSize}
                    onChange={(e) => setBottomSize(e.target.value)}
                    placeholder="28"
                  />
                  <TextField
                    label="신발 사이즈"
                    value={shoesSize}
                    onChange={(e) => setShoesSize(e.target.value)}
                    placeholder="260"
                  />
                </div>
              </section>

              {/* 에러 메시지 */}
              {error && (
                <div
                  style={{
                    padding: 16,
                    background: '#fef2f2',
                    border: '1px solid #fee2e2',
                    borderRadius: 12,
                    color: '#991b1b',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          </form>

          {/* Footer with buttons */}
          <div
            style={{
              padding: '20px 32px',
              borderTop: '1px solid #f1f5f9',
              background: '#fafafa',
              display: 'flex',
              gap: 12,
              justifyContent: 'flex-end',
            }}
          >
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0f172a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b'
                }}
                onClick={resetForm}
              >
                취소
              </button>
            </DialogPrimitive.Close>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={{
                padding: '10px 24px',
                background: isSubmitting ? '#e2e8f0' : '#0f172a',
                color: isSubmitting ? '#94a3b8' : '#ffffff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 160ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#1e293b'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#0f172a'
                }
              }}
            >
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </div>

          <DialogPrimitive.Close
            style={{
              position: 'absolute',
              top: 24,
              right: 32,
              background: 'transparent',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: '#94a3b8',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              transition: 'all 160ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9'
              e.currentTarget.style.color = '#0f172a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#94a3b8'
            }}
            aria-label="Close"
          >
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
