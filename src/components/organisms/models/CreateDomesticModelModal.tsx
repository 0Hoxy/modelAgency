/**
 * CreateDomesticModelModal: 국내모델 등록 모달
 */
import { TextField } from '@molecules/TextField'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ReactNode, useState } from 'react'

import type { CreateDomesticModelRequest, Gender } from '../../../api/models'
import { createDomesticModelByAdmin } from '../../../api/models'

type CreateDomesticModelModalProps = {
  trigger?: ReactNode
  onSuccess?: () => void
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
  { value: 'OTHERS', label: '기타' },
]

export function CreateDomesticModelModal({ trigger, onSuccess }: CreateDomesticModelModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 필수 필드
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<Gender>('MALE')
  const [phone, setPhone] = useState('')
  const [height, setHeight] = useState('')

  // 선택 필드 - 기본 정보
  const [stageName, setStageName] = useState('')
  const [nationality, setNationality] = useState('')
  const [isForeigner, setIsForeigner] = useState(false)

  // SNS
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [tictok, setTictok] = useState('')

  // 주소
  const [addressCity, setAddressCity] = useState('')
  const [addressDistrict, setAddressDistrict] = useState('')
  const [addressStreet, setAddressStreet] = useState('')

  // 특기/언어
  const [specialAbilities, setSpecialAbilities] = useState('')
  const [otherLanguages, setOtherLanguages] = useState('')

  // 타투
  const [hasTattoo, setHasTattoo] = useState(false)
  const [tattooLocation, setTattooLocation] = useState('')
  const [tattooSize, setTattooSize] = useState('')

  // 신체 정보
  const [weight, setWeight] = useState('')
  const [topSize, setTopSize] = useState('')
  const [bottomSize, setBottomSize] = useState('')
  const [shoesSize, setShoesSize] = useState('')

  // 소속사 정보
  const [hasAgency, setHasAgency] = useState(false)
  const [agencyName, setAgencyName] = useState('')
  const [agencyManagerName, setAgencyManagerName] = useState('')
  const [agencyManagerPhone, setAgencyManagerPhone] = useState('')

  const resetForm = () => {
    setName('')
    setBirthDate('')
    setGender('MALE')
    setPhone('')
    setHeight('')
    setStageName('')
    setNationality('')
    setIsForeigner(false)
    setInstagram('')
    setYoutube('')
    setTictok('')
    setAddressCity('')
    setAddressDistrict('')
    setAddressStreet('')
    setSpecialAbilities('')
    setOtherLanguages('')
    setHasTattoo(false)
    setTattooLocation('')
    setTattooSize('')
    setWeight('')
    setTopSize('')
    setBottomSize('')
    setShoesSize('')
    setHasAgency(false)
    setAgencyName('')
    setAgencyManagerName('')
    setAgencyManagerPhone('')
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

    setIsSubmitting(true)

    try {
      const requestData: CreateDomesticModelRequest = {
        name: name.trim(),
        stage_name: stageName.trim() || null,
        birth_date: birthDate,
        gender,
        phone: phone.trim(),
        nationality: nationality.trim() || null,
        instagram: instagram.trim() || null,
        youtube: youtube.trim() || null,
        tictok: tictok.trim() || null,
        address_city: addressCity.trim() || null,
        address_district: addressDistrict.trim() || null,
        address_street: addressStreet.trim() || null,
        special_abilities: specialAbilities.trim() || null,
        other_languages: otherLanguages.trim() || null,
        has_tattoo: hasTattoo,
        tattoo_location: hasTattoo ? tattooLocation.trim() || null : null,
        tattoo_size: hasTattoo ? tattooSize.trim() || null : null,
        height: Number(height),
        weight: weight ? Number(weight) : null,
        top_size: topSize.trim() || null,
        bottom_size: bottomSize.trim() || null,
        shoes_size: shoesSize.trim() || null,
        is_foreigner: isForeigner,
        has_agency: hasAgency,
        agency_name: hasAgency ? agencyName.trim() || null : null,
        agency_manager_name: hasAgency ? agencyManagerName.trim() || null : null,
        agency_manager_phone: hasAgency ? agencyManagerPhone.trim() || null : null,
      }

      await createDomesticModelByAdmin(requestData)

      resetForm()
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      console.error('국내모델 등록 실패:', err)
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
              국내모델 등록
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
                    placeholder="홍길동"
                    required
                  />
                  <TextField
                    label="예명"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="무지개"
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
                    label="국적"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="대한민국"
                  />
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                    >
                      <input
                        type="checkbox"
                        checked={isForeigner}
                        onChange={(e) => setIsForeigner(e.target.checked)}
                      />
                      <span style={{ fontSize: 14 }}>외국인</span>
                    </label>
                  </div>
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
                    label="틱톡"
                    value={tictok}
                    onChange={(e) => setTictok(e.target.value)}
                    placeholder="@username"
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

              {/* 특기/언어 */}
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
                  특기 및 언어
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <TextField
                    label="특기"
                    value={specialAbilities}
                    onChange={(e) => setSpecialAbilities(e.target.value)}
                    placeholder="댄스, 노래, 연기 등"
                  />
                  <TextField
                    label="가능한 언어"
                    value={otherLanguages}
                    onChange={(e) => setOtherLanguages(e.target.value)}
                    placeholder="영어, 일본어 등"
                  />
                </div>
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
                        placeholder="팔, 등 등"
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

              {/* 소속사 정보 */}
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
                  소속사 정보
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={hasAgency}
                      onChange={(e) => setHasAgency(e.target.checked)}
                    />
                    <span style={{ fontSize: 14 }}>소속사 있음</span>
                  </label>
                  {hasAgency && (
                    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                      <TextField
                        label="소속사명"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder="ABC 엔터테인먼트"
                      />
                      <TextField
                        label="담당자명"
                        value={agencyManagerName}
                        onChange={(e) => setAgencyManagerName(e.target.value)}
                        placeholder="김매니저"
                      />
                      <TextField
                        label="담당자 전화번호"
                        value={agencyManagerPhone}
                        onChange={(e) => setAgencyManagerPhone(e.target.value)}
                        placeholder="+821012345678"
                        style={{ gridColumn: '1 / -1' }}
                      />
                    </div>
                  )}
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
