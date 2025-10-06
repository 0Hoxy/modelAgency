/**
 * Camera Test related types
 */

export type CameraTestStatus = '대기중' | '테스트' | '완료' | '취소'

export type CameraTestModel = {
  id: string
  name: string
  birth: string
  nationality: string
  height: number
  agency: string
  visaType: string
  status: CameraTestStatus
  testDate: string // YYYY-MM-DD
}

export type CameraTestFilters = {
  testDate?: string
  status?: CameraTestStatus
  search?: string
}
