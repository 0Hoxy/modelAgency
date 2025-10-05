/**
 * Step 1: 모델 타입 선택 (내국인/외국인) - Premium Mobile UI
 */
import { ArrowRight, Globe, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ModelTypeSelection() {
  const navigate = useNavigate()

  const handleTypeSelect = (type: 'domestic' | 'global') => {
    navigate(`/registration/verification?type=${type}`)
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
      {/* 배경 그라데이션 효과 */}
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
        <div
          style={{
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '20px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#818cf8',
                letterSpacing: '0.5px',
              }}
            >
              STEP 1
            </span>
          </div>

          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '12px',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            모델 등록
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#a1a1aa',
              margin: 0,
              marginTop: '12px',
              fontWeight: 400,
            }}
          >
            시작하기 위해 모델 유형을 선택해주세요
          </p>
        </div>

        {/* 선택 카드 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* 국내 모델 카드 */}
          <button
            onClick={() => handleTypeSelect('domestic')}
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
              borderRadius: '20px',
              padding: '0',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {/* 그라데이션 오버레이 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              className="card-overlay"
            />

            <div
              style={{
                padding: '32px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                position: 'relative',
              }}
            >
              {/* 아이콘 */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                  flexShrink: 0,
                }}
              >
                <MapPin size={28} color="white" strokeWidth={2.5} />
              </div>

              {/* 텍스트 */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: 0,
                    marginBottom: '6px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  국내 모델
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#a1a1aa',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  한국 국적 또는 한국 거주
                </p>
              </div>

              {/* 화살표 */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <ArrowRight size={20} color="#818cf8" strokeWidth={2.5} />
              </div>
            </div>
          </button>

          {/* 해외 모델 카드 */}
          <button
            onClick={() => handleTypeSelect('global')}
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
              borderRadius: '20px',
              padding: '0',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)'
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {/* 그라데이션 오버레이 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              className="card-overlay"
            />

            <div
              style={{
                padding: '32px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                position: 'relative',
              }}
            >
              {/* 아이콘 */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3)',
                  flexShrink: 0,
                }}
              >
                <Globe size={28} color="white" strokeWidth={2.5} />
              </div>

              {/* 텍스트 */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: 0,
                    marginBottom: '6px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Global Model
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#a1a1aa',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Foreign nationality (visa required)
                </p>
              </div>

              {/* 화살표 */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <ArrowRight size={20} color="#c084fc" strokeWidth={2.5} />
              </div>
            </div>
          </button>
        </div>

        {/* 하단 안내 */}
        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#52525b',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            등록 후 담당자가 검토하여 연락드립니다
          </p>
        </div>
      </div>

      {/* 호버 효과를 위한 스타일 */}
      <style>
        {`
          button:hover .card-overlay {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  )
}
