/**
 * Models - QR Code Generator (QR코드 발급)
 */
import { TextField } from '@molecules/TextField'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Download, QrCode } from '@utils/icon'
import { useState } from 'react'

import { downloadQRCodeImage, generateQRCodeBase64 } from '../../api/qrcode'

export default function ModelsQRCode() {
  const [url, setUrl] = useState('')
  const [size, setSize] = useState(10)
  const [border, setBorder] = useState(2)
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
    setSize(10)
    setBorder(2)
    setQrCodeBase64(null)
    setError(null)
  }

  return (
    <SidebarLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 페이지 헤더 */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, marginBottom: 8 }}>
            QR코드 발급
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>
            URL을 입력하여 QR 코드를 생성하고 다운로드할 수 있습니다.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 400px' }}>
          {/* 왼쪽: 입력 폼 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 24,
              border: '1px solid #e2e8f0',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 20 }}>
              설정
            </h2>

            <div style={{ display: 'grid', gap: 20 }}>
              {/* URL 입력 */}
              <div>
                <TextField
                  label="URL"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  helpText="QR 코드로 변환할 URL을 입력하세요. http:// 또는 https:// 생략 가능"
                />
              </div>

              {/* 크기 설정 */}
              <div>
                <label
                  htmlFor="qr-size"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: '#0f172a',
                  }}
                >
                  QR 코드 크기: {size}
                </label>
                <input
                  id="qr-size"
                  type="range"
                  min="1"
                  max="50"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
                <p style={{ fontSize: 12, color: '#64748b', margin: '8px 0 0 0' }}>
                  1-50 사이의 값을 선택하세요 (권장: 10)
                </p>
              </div>

              {/* 테두리 설정 */}
              <div>
                <label
                  htmlFor="qr-border"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                    color: '#0f172a',
                  }}
                >
                  테두리 크기: {border}
                </label>
                <input
                  id="qr-border"
                  type="range"
                  min="0"
                  max="10"
                  value={border}
                  onChange={(e) => setBorder(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
                <p style={{ fontSize: 12, color: '#64748b', margin: '8px 0 0 0' }}>
                  0-10 사이의 값을 선택하세요 (권장: 2)
                </p>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div
                  style={{
                    padding: 12,
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 8,
                    color: '#dc2626',
                    fontSize: 14,
                  }}
                >
                  {error}
                </div>
              )}

              {/* 버튼 그룹 */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !url.trim()}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: isGenerating || !url.trim() ? '#e2e8f0' : '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: isGenerating || !url.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'background 0.2s',
                  }}
                >
                  <QrCode size={18} />
                  {isGenerating ? '생성 중...' : 'QR 코드 생성'}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: '12px 24px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  초기화
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽: QR 코드 미리보기 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 24,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 20 }}>
              미리보기
            </h2>

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                borderRadius: 8,
                padding: 24,
                minHeight: 300,
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
                      fontSize: 14,
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
      </div>
    </SidebarLayout>
  )
}

