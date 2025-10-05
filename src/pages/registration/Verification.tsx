/**
 * Step 2: 본인인증 (재방문 확인) - Premium Mobile UI with i18n
 */
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const TEXTS = {
  domestic: {
    stepBadge: '국내 모델',
    title: '본인인증',
    subtitle: '이름, 전화번호, 생년월일로\n기존 등록 여부를 확인합니다',
    nameLabel: '이름',
    namePlaceholder: '홍길동',
    phoneLabel: '전화번호',
    phonePlaceholder: '01012345678',
    birthLabel: '생년월일',
    submitButton: '다음 단계',
    loadingText: '확인 중...',
    footerText: '기존 등록 여부를 확인합니다\n이미 등록된 경우 정보 수정으로 이동합니다',
  },
  global: {
    stepBadge: 'Global Model',
    title: 'Verification',
    subtitle: 'Verify your existing registration\nwith name, phone, and birth date',
    nameLabel: 'Name',
    namePlaceholder: 'John Doe',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '01012345678',
    birthLabel: 'Date of Birth',
    submitButton: 'Next Step',
    loadingText: 'Verifying...',
    footerText: 'Checking existing registration\nIf already registered, proceed to update',
  },
}

export default function Verification() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const modelType = (searchParams.get('type') as 'domestic' | 'global') || 'domestic'
  const t = TEXTS[modelType]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birth: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: API 호출
      setTimeout(() => {
        navigate(`/registration/form?type=${modelType}&mode=new`, {
          state: { verification: formData },
        })
      }, 1000)
    } catch (error) {
      console.error('본인인증 실패:', error)
      alert(
        modelType === 'domestic'
          ? '본인인증에 실패했습니다. 다시 시도해주세요.'
          : 'Verification failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/registration')}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          width: '44px',
          height: '44px',
          background: 'rgba(39, 39, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(39, 39, 42, 1)'
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(39, 39, 42, 0.8)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <ArrowLeft size={20} color="#ffffff" strokeWidth={2.5} />
      </button>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 헤더 */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background:
                modelType === 'domestic' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(168, 85, 247, 0.1)',
              border:
                modelType === 'domestic'
                  ? '1px solid rgba(99, 102, 241, 0.2)'
                  : '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: modelType === 'domestic' ? '#818cf8' : '#c084fc',
                letterSpacing: '0.5px',
              }}
            >
              STEP 2 · {t.stepBadge}
            </span>
          </div>

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background:
                modelType === 'domestic'
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow:
                modelType === 'domestic'
                  ? '0 12px 32px rgba(99, 102, 241, 0.3)'
                  : '0 12px 32px rgba(168, 85, 247, 0.3)',
            }}
          >
            <CheckCircle size={40} color="white" strokeWidth={2.5} />
          </div>

          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            {t.title}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: '#a1a1aa',
              margin: 0,
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* 폼 카드 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '32px 28px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  marginBottom: '10px',
                }}
              >
                {t.nameLabel} *
              </label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(9, 9, 11, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    modelType === 'domestic' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(168, 85, 247, 0.5)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.8)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.5)'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  marginBottom: '10px',
                }}
              >
                {t.phoneLabel} *
              </label>
              <input
                type="tel"
                placeholder={t.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(9, 9, 11, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    modelType === 'domestic' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(168, 85, 247, 0.5)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.8)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.5)'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  marginBottom: '10px',
                }}
              >
                {t.birthLabel} *
              </label>
              <input
                type="date"
                value={formData.birth}
                onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(9, 9, 11, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  colorScheme: 'dark',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    modelType === 'domestic' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(168, 85, 247, 0.5)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.8)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.background = 'rgba(9, 9, 11, 0.5)'
                }}
              />
            </div>

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
                marginTop: '8px',
                transition: 'all 0.3s ease',
                boxShadow: loading
                  ? 'none'
                  : modelType === 'domestic'
                    ? '0 8px 24px rgba(99, 102, 241, 0.3)'
                    : '0 8px 24px rgba(168, 85, 247, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow =
                    modelType === 'domestic'
                      ? '0 12px 32px rgba(99, 102, 241, 0.4)'
                      : '0 12px 32px rgba(168, 85, 247, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    modelType === 'domestic'
                      ? '0 8px 24px rgba(99, 102, 241, 0.3)'
                      : '0 8px 24px rgba(168, 85, 247, 0.3)'
                }
              }}
            >
              {loading ? t.loadingText : t.submitButton}
            </button>
          </form>
        </div>

        {/* 하단 안내 */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '13px',
              color: '#52525b',
              margin: 0,
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {t.footerText}
          </p>
        </div>
      </div>
    </div>
  )
}
