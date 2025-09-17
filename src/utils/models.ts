import type { DomesticModelRow, OverseasModelRow } from '../types/models'

interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  filters?: Record<string, string>
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const generateMockDomestic = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<DomesticModelRow>> => {
  const firstNames = [
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
  ]
  const agencies = ['스타에이전시', '브릿지엔터', '뉴웨이브', '에이플랜', '라이트하우스']
  const managers = ['이민수', '강소연', '박도윤', '정하린', '최서준']
  const nationalities = ['대한민국']
  const specialties = ['댄스', '보컬', '연기', '모델']
  const langSets = ['한국어', '한국어, 영어', '한국어, 일본어', '한국어, 중국어']
  const addresses = [
    '서울특별시 강남구 역삼동',
    '서울특별시 서초구 서초동',
    '부산광역시 해운대구 우동',
    '인천광역시 연수구 송도동',
    '대구광역시 수성구 범어동',
    '대전광역시 유성구 봉명동',
    '광주광역시 서구 치평동',
    '울산광역시 남구 삼산동',
  ]

  // Generate all mock data (simulate large dataset)
  const allRows: DomesticModelRow[] = Array.from({ length: 150 }).map((_, i) => {
    const name = `${firstNames[i % firstNames.length]}${i + 1}`
    const gender: '남' | '여' = i % 2 === 0 ? '여' : '남'
    const year = 1990 + (i % 12)
    const month = ((i % 12) + 1).toString().padStart(2, '0')
    const day = ((i % 28) + 1).toString().padStart(2, '0')
    return {
      name,
      gender,
      birth: `${year}-${month}-${day}`,
      phone: `010-${(1000 + ((i * 37) % 9000)).toString().padStart(4, '0')}-${(
        1000 +
        ((i * 53) % 9000)
      )
        .toString()
        .padStart(4, '0')}`,
      address: addresses[i % addresses.length],
      agency: agencies[i % agencies.length],
      manager: managers[i % managers.length],
      managerPhone: `010-${(2000 + ((i * 17) % 9000)).toString().padStart(4, '0')}-${(
        3000 +
        ((i * 23) % 9000)
      )
        .toString()
        .padStart(4, '0')}`,
      nationality: nationalities[0],
      specialty: specialties[i % specialties.length],
      languages: langSets[i % langSets.length],
      instagram: `@model_${i + 1}`,
      youtube: i % 3 === 0 ? `channel_${i + 1}` : '-',
      tiktok: i % 4 === 0 ? `@tok_${i + 1}` : '-',
      tattoo: i % 5 === 0 ? '좌측 손목' : '-',
      note: '-',
    }
  })

  // Apply search filter if provided
  let filteredRows = allRows
  if (params?.search) {
    const searchTerm = params.search.toLowerCase()
    filteredRows = allRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm) ||
        row.address.toLowerCase().includes(searchTerm) ||
        row.agency.toLowerCase().includes(searchTerm) ||
        row.manager.toLowerCase().includes(searchTerm) ||
        row.specialty.toLowerCase().includes(searchTerm) ||
        row.languages.toLowerCase().includes(searchTerm),
    )
  }

  // Apply other filters if provided
  if (params?.filters) {
    if (params.filters.gender && params.filters.gender !== 'all') {
      const genderFilter = params.filters.gender === 'male' ? '남' : '여'
      filteredRows = filteredRows.filter((row) => row.gender === genderFilter)
    }
    if (params.filters.nationality) {
      filteredRows = filteredRows.filter((row) =>
        row.nationality.includes(params.filters!.nationality),
      )
    }
    if (params.filters.specialty) {
      filteredRows = filteredRows.filter((row) => row.specialty.includes(params.filters!.specialty))
    }
    if (params.filters.languages) {
      filteredRows = filteredRows.filter((row) => row.languages.includes(params.filters!.languages))
    }
    if (params.filters.name) {
      filteredRows = filteredRows.filter((row) =>
        row.name.toLowerCase().includes(params.filters!.name.toLowerCase()),
      )
    }
    if (params.filters.address) {
      filteredRows = filteredRows.filter((row) =>
        row.address.toLowerCase().includes(params.filters!.address.toLowerCase()),
      )
    }
    if (params.filters.agency) {
      filteredRows = filteredRows.filter((row) =>
        row.agency.toLowerCase().includes(params.filters!.agency.toLowerCase()),
      )
    }
    if (params.filters.manager) {
      filteredRows = filteredRows.filter((row) =>
        row.manager.toLowerCase().includes(params.filters!.manager.toLowerCase()),
      )
    }
  }

  // Calculate pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredRows.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const data = filteredRows.slice(startIndex, endIndex)

  await new Promise((r) => setTimeout(r, 120))

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  }
}

export const generateMockOverseas = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<OverseasModelRow>> => {
  const firstNames = [
    'Emma',
    'Liam',
    'Olivia',
    'Noah',
    'Ava',
    'Mia',
    'Lucas',
    'Sofia',
    'Ethan',
    'Isabella',
  ]
  const nationalities = ['일본', '미국', '영국', '프랑스']
  const specialties = ['보컬', '댄스', '연기', '모델']
  const langSets = ['영어', '영어, 일본어', '영어, 프랑스어', '일본어, 영어']
  const visas = ['E-6', 'H-1', 'D-10', 'B-1']
  const addresses = [
    '서울특별시 강남구 역삼동',
    '서울특별시 서초구 서초동',
    '부산광역시 해운대구 우동',
    '인천광역시 연수구 송도동',
    '대구광역시 수성구 범어동',
    '대전광역시 유성구 봉명동',
    '광주광역시 서구 치평동',
    '울산광역시 남구 삼산동',
  ]

  // Generate all mock data (simulate large dataset)
  const allRows: OverseasModelRow[] = Array.from({ length: 120 }).map((_, i) => {
    const name = `${firstNames[i % firstNames.length]} ${i + 1}`
    const gender: '남' | '여' = i % 2 === 0 ? '여' : '남'
    const year = 1991 + (i % 10)
    const month = ((i % 12) + 1).toString().padStart(2, '0')
    const day = ((i % 28) + 1).toString().padStart(2, '0')
    return {
      name,
      gender,
      birth: `${year}-${month}-${day}`,
      phone: `+1-202-${(100 + ((i * 7) % 900)).toString().padStart(3, '0')}-${(
        1000 +
        ((i * 19) % 9000)
      )
        .toString()
        .padStart(4, '0')}`,
      address: addresses[i % addresses.length],
      nationality: nationalities[i % nationalities.length],
      specialty: specialties[i % specialties.length],
      languages: langSets[i % langSets.length],
      instagram: `@int_${i + 1}`,
      youtube: i % 4 === 0 ? `yt_${i + 1}` : '-',
      visa: visas[i % visas.length],
      tattoo: i % 5 === 0 ? '없음' : '팔 안쪽',
      note: '-',
    }
  })

  // Apply search filter if provided
  let filteredRows = allRows
  if (params?.search) {
    const searchTerm = params.search.toLowerCase()
    filteredRows = allRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm) ||
        row.address.toLowerCase().includes(searchTerm) ||
        row.nationality.toLowerCase().includes(searchTerm) ||
        row.specialty.toLowerCase().includes(searchTerm) ||
        row.languages.toLowerCase().includes(searchTerm),
    )
  }

  // Apply other filters if provided
  if (params?.filters) {
    if (params.filters.gender && params.filters.gender !== 'all') {
      const genderFilter = params.filters.gender === 'male' ? '남' : '여'
      filteredRows = filteredRows.filter((row) => row.gender === genderFilter)
    }
    if (params.filters.nationality) {
      filteredRows = filteredRows.filter((row) =>
        row.nationality.includes(params.filters!.nationality),
      )
    }
    if (params.filters.specialty) {
      filteredRows = filteredRows.filter((row) => row.specialty.includes(params.filters!.specialty))
    }
    if (params.filters.languages) {
      filteredRows = filteredRows.filter((row) => row.languages.includes(params.filters!.languages))
    }
    if (params.filters.name) {
      filteredRows = filteredRows.filter((row) =>
        row.name.toLowerCase().includes(params.filters!.name.toLowerCase()),
      )
    }
    if (params.filters.address) {
      filteredRows = filteredRows.filter((row) =>
        row.address.toLowerCase().includes(params.filters!.address.toLowerCase()),
      )
    }
  }

  // Calculate pagination
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10
  const total = filteredRows.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const data = filteredRows.slice(startIndex, endIndex)

  await new Promise((r) => setTimeout(r, 120))

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  }
}

// Legacy API-backed fetchers (kept for backward compatibility)
export const fetchDomesticModels = async (): Promise<DomesticModelRow[]> => {
  const result = await generateMockDomestic()
  return result.data
}

export const fetchOverseasModels = async (): Promise<OverseasModelRow[]> => {
  const result = await generateMockOverseas()
  return result.data
}
