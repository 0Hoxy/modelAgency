/**
 * Contact utilities
 */
import type { Contact, PagedResponse } from '../types/contact'

// Mock data generators
export function mockContacts(count: number = 50): Contact[] {
  const categories: Contact['category'][] = [
    'general-inquiry',
    'partnership',
    'modeling-request',
    'complaint',
    'suggestion',
    'other',
  ]

  const priorities: Contact['priority'][] = ['low', 'medium', 'high', 'urgent']
  const statuses: Contact['status'][] = ['new', 'in-progress', 'resolved', 'closed']

  const names = [
    '김민수',
    '이지영',
    '박준호',
    '최수진',
    '정현우',
    '한소영',
    '임태호',
    '강미래',
    '윤서준',
    '조하늘',
    '신예린',
    '오민석',
    '송지은',
    '배현수',
    '노가영',
  ]

  const companies = [
    '삼성전자',
    'LG전자',
    '네이버',
    '카카오',
    '현대자동차',
    'SK텔레콤',
    'KT',
    '롯데',
    'CJ',
    '한화',
    '대한항공',
    '아시아나항공',
    'GS칼텍스',
    '포스코',
    '두산',
  ]

  const titles = [
    '모델 에이전시 파트너십 문의',
    '화보 촬영 모델 요청',
    '패션쇼 모델 섭외 문의',
    '광고 모델 캐스팅 요청',
    '이벤트 모델 섭외',
    '온라인 광고 모델 문의',
    '브랜드 앰배서더 제안',
    '모델 매니지먼트 서비스 문의',
    '캐스팅 정보 요청',
    '모델 포트폴리오 문의',
  ]

  const messages = [
    '안녕하세요. 저희 회사에서 진행하는 프로젝트에 모델 섭외를 문의드립니다.',
    '패션 브랜드 런칭을 앞두고 모델 에이전시와 파트너십을 맺고 싶습니다.',
    '화보 촬영을 위한 모델 섭외가 필요합니다. 연락 부탁드립니다.',
    '광고 캠페인에 참여할 모델을 찾고 있습니다.',
    '이벤트 진행을 위한 모델 섭외 문의드립니다.',
    '온라인 광고에 출연할 모델을 찾고 있습니다.',
    '브랜드 앰배서더로 활동할 모델을 찾고 있습니다.',
    '모델 매니지먼트 서비스에 대해 문의드립니다.',
    '캐스팅 정보를 얻고 싶습니다.',
    '모델 포트폴리오를 확인하고 싶습니다.',
  ]

  return Array.from({ length: count }, (_, i) => {
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    const updatedAt = new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)

    return {
      id: `contact-${i + 1}`,
      name: names[Math.floor(Math.random() * names.length)],
      email: `user${i + 1}@example.com`,
      phone:
        Math.random() > 0.3
          ? `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
          : undefined,
      company:
        Math.random() > 0.4 ? companies[Math.floor(Math.random() * companies.length)] : undefined,
      title: titles[Math.floor(Math.random() * titles.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignedTo: Math.random() > 0.5 ? `담당자${Math.floor(Math.random() * 3) + 1}` : undefined,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      isRead: Math.random() > 0.3,
      tags:
        Math.random() > 0.7
          ? ['긴급', 'VIP', '신규고객'].slice(0, Math.floor(Math.random() * 3) + 1)
          : undefined,
    }
  })
}

// Utility functions
export function paginate<T>(data: T[], page: number, pageSize: number): PagedResponse<T> {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    total: data.length,
    page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize),
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function filterContacts(
  contacts: Contact[],
  filters: {
    search?: string
    category?: string
    priority?: string
    status?: string
    isRead?: boolean
  },
): Contact[] {
  return contacts.filter((contact) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.title.toLowerCase().includes(searchLower) ||
        contact.message.toLowerCase().includes(searchLower) ||
        (contact.company && contact.company.toLowerCase().includes(searchLower))

      if (!matchesSearch) return false
    }

    if (filters.category && contact.category !== filters.category) return false
    if (filters.priority && contact.priority !== filters.priority) return false
    if (filters.status && contact.status !== filters.status) return false
    if (filters.isRead !== undefined && contact.isRead !== filters.isRead) return false

    return true
  })
}

export function getContactStats(contacts: Contact[]) {
  const total = contacts.length
  const newCount = contacts.filter((c) => c.status === 'new').length
  const inProgressCount = contacts.filter((c) => c.status === 'in-progress').length
  const resolvedCount = contacts.filter((c) => c.status === 'resolved').length
  const unreadCount = contacts.filter((c) => !c.isRead).length

  return {
    total,
    new: newCount,
    inProgress: inProgressCount,
    resolved: resolvedCount,
    unread: unreadCount,
  }
}
