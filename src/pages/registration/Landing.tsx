/**
 * 모델 등록 랜딩 페이지 - Premium Landing Page
 */
import { ArrowRight, CheckCircle, Globe, Shield, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
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

      {/* 메인 컨텐츠 */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '24px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#818cf8',
                letterSpacing: '0.5px',
              }}
            >
              ✨ MODEL REGISTRATION
            </span>
          </div>

          <h1
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: '24px',
              letterSpacing: '-1px',
              lineHeight: 1.2,
            }}
          >
            당신의 꿈을 시작하세요
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Start Your Dream
            </span>
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#a1a1aa',
              margin: 0,
              marginBottom: '48px',
              lineHeight: 1.6,
            }}
          >
            모델 등록부터 시작까지, 간편하고 빠르게
            <br />
            Simple and fast, from registration to debut
          </p>

          {/* CTA 버튼 */}
          <button
            onClick={() => navigate('/registration')}
            style={{
              padding: '18px 48px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: '0 12px 32px rgba(99, 102, 241, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(99, 102, 241, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.3)'
            }}
          >
            등록 시작하기
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* 특징 카드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {/* 특징 1 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <CheckCircle size={28} color="#818cf8" strokeWidth={2} />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                marginBottom: '12px',
              }}
            >
              간편한 등록
              <br />
              <span style={{ fontSize: '16px', color: '#a1a1aa' }}>Easy Registration</span>
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#71717a',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              3단계로 완료하는 빠른 등록 프로세스
            </p>
          </div>

          {/* 특징 2 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(168, 85, 247, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Globe size={28} color="#c084fc" strokeWidth={2} />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                marginBottom: '12px',
              }}
            >
              글로벌 지원
              <br />
              <span style={{ fontSize: '16px', color: '#a1a1aa' }}>Global Support</span>
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#71717a',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              국내 및 해외 모델 모두 환영합니다
            </p>
          </div>

          {/* 특징 3 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Shield size={28} color="#4ade80" strokeWidth={2} />
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                marginBottom: '12px',
              }}
            >
              안전한 관리
              <br />
              <span style={{ fontSize: '16px', color: '#a1a1aa' }}>Secure Management</span>
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#71717a',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              개인정보 보호 및 체계적인 프로필 관리
            </p>
          </div>
        </div>

        {/* 프로세스 안내 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
            }}
          >
            <Sparkles size={24} color="#818cf8" />
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
              }}
            >
              등록 프로세스
              <span style={{ fontSize: '20px', color: '#a1a1aa', marginLeft: '12px' }}>
                Registration Process
              </span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {/* Step 1 */}
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                1
              </div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                타입 선택
              </h4>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>국내/해외 선택</p>
            </div>

            {/* Step 2 */}
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                2
              </div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                본인 인증
              </h4>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>정보 확인</p>
            </div>

            {/* Step 3 */}
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                3
              </div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                정보 입력
              </h4>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>프로필 작성</p>
            </div>

            {/* Step 4 */}
            <div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #22c55e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                ✓
              </div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                등록 완료
              </h4>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>담당자 연락</p>
            </div>
          </div>

          {/* 하단 CTA */}
          <button
            onClick={() => navigate('/registration')}
            style={{
              marginTop: '48px',
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)'
            }}
          >
            지금 시작하기
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 푸터 */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: '14px', color: '#52525b', margin: 0 }}>
          © 2025 Model Agency. All rights reserved.
        </p>
      </div>
    </div>
  )
}
