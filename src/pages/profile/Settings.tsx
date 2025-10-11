/**
 * 계정 설정 페이지 - Profile Settings
 */
import { changePassword, type ChangePasswordRequest, getCurrentUserInfo } from '@api/auth'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Camera, Check, Eye, EyeOff, Lock, Mail, Save, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ProfileSettings() {
  // 프로필 정보
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 비밀번호 변경
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // 알림 설정
  const [emailNotification, setEmailNotification] = useState(true)
  const [pushNotification, setPushNotification] = useState(true)

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        const userInfo = await getCurrentUserInfo()
        setName(userInfo.name)
        setEmail(userInfo.pid)
      } catch (err) {
        console.error('사용자 정보 로드 실패:', err)
        setError('사용자 정보를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    loadUserInfo()
  }, [])

  const handleProfileUpdate = () => {
    // TODO: API 호출
    alert('프로필이 업데이트되었습니다.')
  }

  const handlePasswordChange = async () => {
    // 유효성 검사
    if (!currentPassword.trim()) {
      setPasswordError('현재 비밀번호를 입력해주세요.')
      return
    }

    if (!newPassword.trim()) {
      setPasswordError('새 비밀번호를 입력해주세요.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 합니다.')
      return
    }

    if (currentPassword === newPassword) {
      setPasswordError('새 비밀번호는 현재 비밀번호와 달라야 합니다.')
      return
    }

    try {
      setPasswordLoading(true)
      setPasswordError(null)
      setPasswordSuccess(false)

      const requestData: ChangePasswordRequest = {
        current_password: currentPassword,
        new_password: newPassword,
      }

      await changePassword(requestData)

      // 성공 처리
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setPasswordSuccess(false)
      }, 3000)
    } catch (err: unknown) {
      console.error('비밀번호 변경 실패:', err)

      // API 에러 메시지 추출
      const errorMessage =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        '비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.'
      setPasswordError(errorMessage)
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNotificationUpdate = () => {
    // TODO: API 호출
    alert('알림 설정이 업데이트되었습니다.')
  }

  return (
    <SidebarLayout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 프로필 정보 섹션 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <User size={20} color="#3b82f6" strokeWidth={2.5} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>프로필 정보</h2>
          </div>

          {/* 프로필 이미지 */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: profileImage ? `url(${profileImage})` : '#e2e8f0',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #ffffff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                {!profileImage && <User size={48} color="#94a3b8" />}
              </div>
              <label
                htmlFor="profile-image"
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Camera size={18} color="white" />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          {/* 입력 필드 */}
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                이름
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={18}
                  color="#9ca3af"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  placeholder={loading ? '로딩 중...' : '이름을 입력하세요'}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: loading ? '#f9fafb' : '#ffffff',
                    color: loading ? '#9ca3af' : '#374151',
                  }}
                  onFocus={(e) => {
                    if (!loading) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                이메일
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  color="#9ca3af"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder={loading ? '로딩 중...' : '이메일을 입력하세요'}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: loading ? '#f9fafb' : '#ffffff',
                    color: loading ? '#9ca3af' : '#374151',
                  }}
                  onFocus={(e) => {
                    if (!loading) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              style={{
                padding: '8px 16px',
                background: loading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#2563eb'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#3b82f6'
                }
              }}
            >
              <Save size={14} />
              {loading ? '로딩 중...' : '프로필 저장'}
            </button>
          </div>
        </div>

        {/* 비밀번호 변경 섹션 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Lock size={20} color="#3b82f6" strokeWidth={2.5} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>비밀번호 변경</h2>
          </div>

          {/* 비밀번호 변경 에러 메시지 */}
          {passwordError && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '16px',
              }}
            >
              {passwordError}
            </div>
          )}

          {/* 비밀번호 변경 성공 메시지 */}
          {passwordSuccess && (
            <div
              style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                color: '#166534',
                fontSize: '14px',
                marginBottom: '16px',
              }}
            >
              비밀번호가 성공적으로 변경되었습니다.
            </div>
          )}

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                현재 비밀번호
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  color="#9ca3af"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={passwordLoading}
                  placeholder={passwordLoading ? '로딩 중...' : '현재 비밀번호를 입력하세요'}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: passwordLoading ? '#f9fafb' : '#ffffff',
                    color: passwordLoading ? '#9ca3af' : '#374151',
                  }}
                  onFocus={(e) => {
                    if (!passwordLoading) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} color="#9ca3af" />
                  ) : (
                    <Eye size={18} color="#9ca3af" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                새 비밀번호
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  color="#9ca3af"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={passwordLoading}
                  placeholder={passwordLoading ? '로딩 중...' : '새 비밀번호를 입력하세요'}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: passwordLoading ? '#f9fafb' : '#ffffff',
                    color: passwordLoading ? '#9ca3af' : '#374151',
                  }}
                  onFocus={(e) => {
                    if (!passwordLoading) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  {showNewPassword ? (
                    <EyeOff size={18} color="#9ca3af" />
                  ) : (
                    <Eye size={18} color="#9ca3af" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                새 비밀번호 확인
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  color="#9ca3af"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} color="#9ca3af" />
                  ) : (
                    <Eye size={18} color="#9ca3af" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <p
            style={{ fontSize: '13px', color: '#71717a', marginTop: '12px', marginBottom: '16px' }}
          >
            비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함하는 것을 권장합니다.
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handlePasswordChange}
              disabled={passwordLoading}
              style={{
                padding: '8px 16px',
                background: passwordLoading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: passwordLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                opacity: passwordLoading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!passwordLoading) {
                  e.currentTarget.style.background = '#2563eb'
                }
              }}
              onMouseLeave={(e) => {
                if (!passwordLoading) {
                  e.currentTarget.style.background = '#3b82f6'
                }
              }}
            >
              <Lock size={14} />
              {passwordLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </div>
        </div>

        {/* 알림 설정 섹션 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Mail size={20} color="#3b82f6" strokeWidth={2.5} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>알림 설정</h2>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '8px',
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                  이메일 알림
                </div>
                <div style={{ fontSize: '13px', color: '#71717a' }}>
                  중요한 업데이트를 이메일로 받습니다
                </div>
              </div>
              <label
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '48px',
                  height: '24px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={(e) => setEmailNotification(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: emailNotification ? '#3b82f6' : '#d1d5db',
                    borderRadius: '24px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: emailNotification ? '26px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {emailNotification && <Check size={14} color="#3b82f6" strokeWidth={3} />}
                  </div>
                </div>
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '8px',
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                  푸시 알림
                </div>
                <div style={{ fontSize: '13px', color: '#71717a' }}>
                  브라우저 푸시 알림을 받습니다
                </div>
              </div>
              <label
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '48px',
                  height: '24px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={pushNotification}
                  onChange={(e) => setPushNotification(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: pushNotification ? '#3b82f6' : '#d1d5db',
                    borderRadius: '24px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: pushNotification ? '26px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pushNotification && <Check size={14} color="#3b82f6" strokeWidth={3} />}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={handleNotificationUpdate}
              style={{
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6'
              }}
            >
              <Save size={14} />
              알림 설정 저장
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
