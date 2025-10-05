/**
 * 관리자 로그인 페이지 - Premium Admin Login
 */
import { Eye, EyeOff, Lock, LogIn, Mail, Shield } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: API 호출
      setTimeout(() => {
        // 임시: 로그인 성공 시 대시보드로 이동
        navigate('/dashboard/overview')
      }, 1000)
    } catch (error) {
      console.error('로그인 실패:', error)
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
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
            'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 왼쪽: 브랜드 섹션 (데스크톱에서만 표시) */}
      <div
        style={{
          display: 'none',
          flex: 1,
          maxWidth: '500px',
          position: 'relative',
          zIndex: 1,
          padding: '40px',
        }}
        className="desktop-only"
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={28} color="white" strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Model Agency
          </h1>
        </div>

        <h2
          style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            marginBottom: '20px',
            letterSpacing: '-1px',
            lineHeight: 1.2,
          }}
        >
          관리자 시스템에
          <br />
          오신 것을 환영합니다
        </h2>

        <p
          style={{
            fontSize: '18px',
            color: '#a1a1aa',
            lineHeight: 1.6,
            margin: 0,
            marginBottom: '40px',
          }}
        >
          모델 관리, 인사 관리, 재무 관리 등
          <br />
          모든 비즈니스를 한 곳에서 관리하세요
        </p>

        {/* 특징 아이콘 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} color="#60a5fa" />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                }}
              >
                보안 강화
              </h3>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>안전한 데이터 관리</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogIn size={20} color="#818cf8" />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#e4e4e7',
                  margin: 0,
                }}
              >
                간편한 접근
              </h3>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>빠른 로그인 시스템</p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 로그인 폼 */}
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 로그인 카드 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* 헤더 */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 12px 32px rgba(59, 130, 246, 0.3)',
              }}
            >
              <Lock size={36} color="white" strokeWidth={2.5} />
            </div>

            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '20px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#60a5fa',
                  letterSpacing: '0.5px',
                }}
              >
                ADMIN ACCESS
              </span>
            </div>

            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                marginBottom: '8px',
                letterSpacing: '-0.5px',
              }}
            >
              관리자 로그인
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: '#a1a1aa',
                margin: 0,
              }}
            >
              인증된 관리자만 접근 가능합니다
            </p>
          </div>

          {/* 로그인 폼 */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* 이메일 */}
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
                이메일
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <Mail size={20} color="#71717a" />
                </div>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
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
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                    e.currentTarget.style.background = 'rgba(9, 9, 11, 0.8)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.background = 'rgba(9, 9, 11, 0.5)'
                  }}
                />
              </div>
            </div>

            {/* 비밀번호 */}
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
                비밀번호
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <Lock size={20} color="#71717a" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 48px',
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
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                    e.currentTarget.style.background = 'rgba(9, 9, 11, 0.8)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.background = 'rgba(9, 9, 11, 0.5)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#71717a" />
                  ) : (
                    <Eye size={20} color="#71717a" />
                  )}
                </button>
              </div>
            </div>

            {/* 옵션 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#a1a1aa',
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#3b82f6',
                    cursor: 'pointer',
                  }}
                />
                로그인 상태 유지
              </label>
              <button
                type="button"
                onClick={() => alert('비밀번호 찾기 기능은 준비 중입니다.')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#60a5fa',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                비밀번호 찾기
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading
                  ? 'rgba(63, 63, 70, 0.5)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(59, 130, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)'
                }
              }}
            >
              {loading ? '로그인 중...' : '로그인'}
              {!loading && <LogIn size={20} />}
            </button>
          </form>

          {/* 하단 안내 */}
          <div
            style={{
              marginTop: '32px',
              padding: '20px',
              background: 'rgba(234, 179, 8, 0.05)',
              border: '1px solid rgba(234, 179, 8, 0.2)',
              borderRadius: '12px',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                color: '#a1a1aa',
                margin: 0,
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              <span style={{ color: '#facc15' }}>⚠️</span> 관리자 계정만 접근 가능합니다
              <br />
              일반 사용자는{' '}
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#60a5fa',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                여기
              </button>
              를 클릭하세요
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#52525b', margin: 0 }}>
            © 2025 Model Agency. All rights reserved.
          </p>
        </div>
      </div>

      {/* 반응형 스타일 */}
      <style>
        {`
          @media (min-width: 1024px) {
            .desktop-only {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  )
}
