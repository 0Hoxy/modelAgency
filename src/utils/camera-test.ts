/**
 * Camera Test utilities and mock data generation
 */
import type { CameraTestModel, CameraTestStatus } from '../types/camera-test'

// Mock data generation for camera test models
export const generateMockCameraTestData = (): CameraTestModel[] => {
  const names = [
    '김하늘',
    '이서준',
    '박지후',
    '최서연',
    '정유나',
    '한도현',
    '서윤아',
    '문지우',
    '오세윤',
    '배지민',
    '조민수',
    '강소연',
    '윤도현',
    '임하린',
    '신서준',
    '황지민',
    '노하늘',
    '송도윤',
    '유서연',
    '홍지후',
  ]

  const nationalities = [
    '대한민국',
    '미국',
    '일본',
    '중국',
    '태국',
    '베트남',
    '필리핀',
    '러시아',
    '독일',
    '프랑스',
  ]
  const agencies = [
    '스타에이전시',
    '브릿지엔터',
    '뉴웨이브',
    '에이플랜',
    '라이트하우스',
    '글로벌모델',
    '원스타',
    '비전엔터',
  ]
  const visaTypes = ['F-4', 'F-6', 'E-7', 'D-10', 'C-3', 'B-2', 'A-1', 'F-1', 'E-2', 'D-2']
  const statuses: CameraTestStatus[] = ['대기중', '테스트', '완료']

  const today = new Date()
  const testDates = [
    new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2일 전
    new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1일 전
    today.toISOString().split('T')[0], // 오늘
    new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 내일
    new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2일 후
  ]

  const models: CameraTestModel[] = []

  // 각 날짜별로 8-12명의 모델 생성
  testDates.forEach((date) => {
    const count = 8 + Math.floor(Math.random() * 5) // 8-12명
    for (let i = 0; i < count; i++) {
      const nameIndex = (models.length + i) % names.length
      const nationalityIndex = Math.floor(Math.random() * nationalities.length)
      const agencyIndex = Math.floor(Math.random() * agencies.length)
      const visaIndex = Math.floor(Math.random() * visaTypes.length)
      const statusIndex = Math.floor(Math.random() * statuses.length)

      // 생년월일 생성 (1990-2005)
      const year = 1990 + Math.floor(Math.random() * 16)
      const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')
      const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')

      // 키 생성 (150-190cm)
      const height = 150 + Math.floor(Math.random() * 41)

      models.push({
        id: `camera-test-${date}-${i + 1}`,
        name: names[nameIndex],
        birth: `${year}-${month}-${day}`,
        nationality: nationalities[nationalityIndex],
        height,
        agency: agencies[agencyIndex],
        visaType: visaTypes[visaIndex],
        status: statuses[statusIndex],
        testDate: date,
      })
    }
  })

  return models
}

// 상태 변경 함수
export const updateCameraTestStatus = (
  models: CameraTestModel[],
  id: string,
  newStatus: CameraTestStatus,
): CameraTestModel[] => {
  return models.map((model) => (model.id === id ? { ...model, status: newStatus } : model))
}

// 날짜별 필터링 함수
export const filterByTestDate = (models: CameraTestModel[], date: string): CameraTestModel[] => {
  return models.filter((model) => model.testDate === date)
}

// 상태별 필터링 함수
export const filterByStatus = (
  models: CameraTestModel[],
  status: CameraTestStatus,
): CameraTestModel[] => {
  return models.filter((model) => model.status === status)
}

// 검색 함수
export const searchModels = (models: CameraTestModel[], searchTerm: string): CameraTestModel[] => {
  if (!searchTerm) return models

  const term = searchTerm.toLowerCase()
  return models.filter(
    (model) =>
      model.name.toLowerCase().includes(term) ||
      model.nationality.toLowerCase().includes(term) ||
      model.agency.toLowerCase().includes(term) ||
      model.visaType.toLowerCase().includes(term),
  )
}
