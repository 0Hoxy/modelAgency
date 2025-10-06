/**
 * QR 코드 API 함수
 */

import { post } from '../utils/http'

// QR 코드 생성 요청 타입
export interface QRCodeGenerateRequest {
  url: string
  size?: number // 1-50, 기본값: 10
  border?: number // 0-10, 기본값: 2
}

// QR 코드 Base64 응답 타입
export interface QRCodeBase64Response {
  qrcode_base64: string
  url: string
  size: number
  format?: string
}

/**
 * QR 코드 Base64 생성
 */
export const generateQRCodeBase64 = async (
  request: QRCodeGenerateRequest,
): Promise<QRCodeBase64Response> => {
  try {
    const response = await post<QRCodeBase64Response>('/qrcode/generate/base64', request)
    return response
  } catch (error) {
    console.error('QR 코드 생성 실패:', error)
    throw error
  }
}

/**
 * QR 코드 이미지 다운로드 (PNG)
 */
export const downloadQRCodeImage = async (request: QRCodeGenerateRequest): Promise<void> => {
  try {
    // Base64로 받아서 다운로드
    const response = await generateQRCodeBase64(request)
    
    // Base64를 Blob으로 변환
    const base64Data = response.qrcode_base64
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/png' })
    
    // 다운로드 링크 생성
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // 파일명 생성 (URL에서 도메인 추출)
    const urlObj = new URL(request.url.startsWith('http') ? request.url : `https://${request.url}`)
    const domain = urlObj.hostname.replace(/\./g, '_')
    link.download = `qrcode_${domain}_${Date.now()}.png`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('QR 코드 다운로드 실패:', error)
    throw error
  }
}

