/**
 * Models - QR Code Generator (QR코드 발급)
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { Download, QrCode } from '@utils/icon'
import { useState } from 'react'

import { downloadQRCodeImage, generateQRCodeBase64 } from '../../api/qrcode'

export default function ModelsQRCode() {
  const [url, setUrl] = useState('http://localhost:5173')
  // 가장 많이 사용되는 기본값으로 고정
  const size = 8
  const border = 2
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // URL 유효성 검사
  const validateUrl = (input: string): boolean => {
    if (!input.trim()) return false

    // http:// 또는 https://가 없으면 추가
    let fullUrl = input.trim()
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl
    }

    try {
      new URL(fullUrl)
      return true
    } catch {
      return false
    }
  }

  // QR 코드 생성
  const handleGenerate = async () => {
    if (!validateUrl(url)) {
      setError('올바른 URL을 입력해주세요.')
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      // URL에 http:// 또는 https:// 추가
      let fullUrl = url.trim()
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        fullUrl = 'https://' + fullUrl
      }

      const response = await generateQRCodeBase64({
        url: fullUrl,
        size,
        border,
      })

      setQrCodeBase64(response.qrcode_base64)
    } catch (err) {
      console.error('QR 코드 생성 실패:', err)
      setError('QR 코드 생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsGenerating(false)
    }
  }

  // QR 코드 다운로드
  const handleDownload = async () => {
    if (!validateUrl(url)) {
      setError('올바른 URL을 입력해주세요.')
      return
    }

    setError(null)
    setIsDownloading(true)

    try {
      // URL에 http:// 또는 https:// 추가
      let fullUrl = url.trim()
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        fullUrl = 'https://' + fullUrl
      }

      await downloadQRCodeImage({
        url: fullUrl,
        size,
        border,
      })
    } catch (err) {
      console.error('QR 코드 다운로드 실패:', err)
      setError('QR 코드 다운로드에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsDownloading(false)
    }
  }

  // 초기화
  const handleReset = () => {
    setUrl('')
    setQrCodeBase64(null)
    setError(null)
  }

  return (
    <SidebarLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr' }}>
          {/* 설정 섹션 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 24,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                marginBottom: 20,
                color: '#1f2937',
              }}
            >
              QR 코드 생성
            </h3>

            {/* URL 입력 섹션 */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: 8,
                }}
              >
                웹사이트 URL
              </label>
              <input
                type="url"
                placeholder="https://example.com 또는 example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  paddingTop: 12,
                  paddingRight: 16,
                  paddingBottom: 12,
                  paddingLeft: 16,
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#1f2937',
                  background: '#ffffff',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb'
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <p
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  margin: 0,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                http:// 또는 https://는 생략 가능합니다
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !url.trim()}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: isGenerating || !url.trim() ? '#e2e8f0' : '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: isGenerating || !url.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                  boxShadow: isGenerating || !url.trim() ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  if (!isGenerating && url.trim()) {
                    e.currentTarget.style.background = '#1d4ed8'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isGenerating && url.trim()) {
                    e.currentTarget.style.background = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <QrCode size={16} />
                {isGenerating ? '생성 중...' : 'QR 코드 생성'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '10px 16px',
                  background: '#f8fafc',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: 80,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9'
                  e.currentTarget.style.borderColor = '#cbd5e1'
                  e.currentTarget.style.color = '#475569'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.color = '#64748b'
                }}
              >
                초기화
              </button>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 8,
                  color: '#dc2626',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: '#dc2626',
                    borderRadius: '50%',
                  }}
                />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* QR 코드 미리보기 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            padding: 20,
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              borderRadius: 8,
              padding: 40,
              minHeight: 200,
            }}
          >
            {qrCodeBase64 ? (
              <div style={{ textAlign: 'center' }}>
                <img
                  src={`data:image/png;base64,${qrCodeBase64}`}
                  alt="QR Code"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    background: '#ffffff',
                  }}
                />
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  style={{
                    marginTop: 16,
                    padding: '10px 20px',
                    background: isDownloading ? '#e2e8f0' : '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: isDownloading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    transition: 'background 0.2s',
                  }}
                >
                  <Download size={18} />
                  {isDownloading ? '다운로드 중...' : 'PNG 다운로드'}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <QrCode size={64} strokeWidth={1} />
                <p style={{ marginTop: 16, fontSize: 14 }}>
                  URL을 입력하고 'QR 코드 생성' 버튼을 클릭하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
