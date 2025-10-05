/**
 * Step 4: 등록 완료 - Premium Mobile UI with i18n
 */
import { CheckCircle2, Home, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TEXTS = {
  domestic: {
    badge: 'COMPLETE',
    title: '등록 완료!',
    message: (name: string) => (
      <>
        <strong style={{ color: '#e4e4e7', fontSize: '18px' }}>{name}</strong> 님의
        <br />
        접수가 성공적으로 완료되었습니다
      </>
    ),
    infoTitle: '검토 후 담당자가 연락드리겠습니다',
    infoSubtitle: '입력하신 전화번호로 연락드릴 예정입니다',
    button: '처음으로 돌아가기',
    countdown: '초 후 자동으로 처음으로 이동합니다',
  },
  global: {
    badge: 'COMPLETE',
    title: 'Registration Complete!',
    message: (name: string) => (
      <>
        <strong style={{ color: '#e4e4e7', fontSize: '18px' }}>{name}</strong>'s
        <br />
        application has been successfully submitted
      </>
    ),
    infoTitle: 'Our team will contact you after review',
    infoSubtitle: 'We will reach out to the phone number you provided',
    button: 'Back to Start',
    countdown: 'seconds until automatic redirect',
  },
}

export default function Complete() {
  const navigate = useNavigate()
  const location = useLocation()
  const modelName = location.state?.modelName || 'Model'
  const modelType = (location.state?.modelType as 'domestic' | 'global') || 'domestic'
  const t = TEXTS[modelType]

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

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
      {/* 배경 그라데이션 애니메이션 */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 떠다니는 파티클 효과 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <Sparkles size={24} color="rgba(99, 102, 241, 0.3)" />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          animation: 'float 4s ease-in-out infinite 0.5s',
        }}
      >
        <Sparkles size={20} color="rgba(34, 197, 94, 0.3)" />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          animation: 'float 3.5s ease-in-out infinite 1s',
        }}
      >
        <Sparkles size={16} color="rgba(168, 85, 247, 0.3)" />
      </div>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* 성공 아이콘 */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
            }}
          >
            <CheckCircle2 size={64} color="white" strokeWidth={2.5} />
          </div>

          {/* 배지 */}
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#4ade80',
                letterSpacing: '0.5px',
              }}
            >
              {t.badge}
            </span>
          </div>

          {/* 제목 */}
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            {t.title}
          </h1>

          {/* 메시지 */}
          <p
            style={{
              fontSize: '16px',
              color: '#a1a1aa',
              lineHeight: 1.7,
              margin: 0,
              marginBottom: '32px',
            }}
          >
            {t.message(modelName)}
          </p>

          {/* 구분선 */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
              margin: '32px 0',
            }}
          />

          {/* 안내 카드 */}
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.1)',
              borderRadius: '16px',
              padding: '24px 20px',
              marginBottom: '32px',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                color: '#d4d4d8',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {t.infoTitle}
              <br />
              <span style={{ color: '#4ade80', fontWeight: 500 }}>{t.infoSubtitle}</span>
            </p>
          </div>

          {/* 돌아가기 버튼 */}
          <button
            onClick={() => navigate('/registration')}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.3)'
            }}
          >
            <Home size={20} />
            {t.button}
          </button>

          {/* 카운트다운 */}
          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 700,
                color: '#4ade80',
              }}
            >
              {countdown}
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#71717a',
                margin: 0,
              }}
            >
              {modelType === 'domestic' ? t.countdown : `${t.countdown}`}
            </p>
          </div>
        </div>
      </div>

      {/* 애니메이션 */}
      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0) rotate(-180deg);
              opacity: 0;
            }
            to {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
              opacity: 0.5;
            }
            50% {
              transform: translateY(-20px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}
