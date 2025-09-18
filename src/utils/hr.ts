import type {
  AttendanceRecord,
  BenefitCategory,
  BenefitRequest,
  Candidate,
  Employee,
  JobPosting,
  PagedResponse,
  PayrollItem,
  PerformanceFeedback,
  PerformanceGoal,
  PerformanceReview,
  TrainingCourse,
  TrainingEnrollment,
} from '../types/hr'

export function paginate<T>(rows: T[], page = 1, pageSize = 10): PagedResponse<T> {
  const total = rows.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const data = rows.slice(start, start + pageSize)
  return { data, total, page, pageSize, totalPages }
}

export function mockEmployees(count = 120): Employee[] {
  const names = [
    '김철수',
    '이영희',
    '박민수',
    '최지영',
    '정수현',
    '강동원',
    '윤서연',
    '임태현',
    '한소영',
    '오준혁',
    '송미래',
    '조현우',
    '신예은',
    '배성민',
    '허지훈',
    '노하늘',
    '서다은',
    '권태준',
    '황서윤',
    '문재혁',
    '안지현',
    '유준서',
    '전소민',
    '고민호',
    '홍길동',
    '김영수',
    '박지민',
    '이서준',
    '최유진',
    '정민재',
    '강서윤',
    '윤도현',
    '임채원',
    '한지호',
    '오서연',
    '송준우',
    '조예린',
    '신현수',
    '배소영',
    '허태민',
    '노지훈',
    '서예은',
    '권동혁',
    '황서아',
    '문준영',
    '안지수',
    '유민재',
    '전서현',
    '고태우',
    '홍서영',
    '김지호',
    '박예준',
    '이서아',
    '최민수',
    '정지영',
    '강태현',
    '윤서준',
    '임채민',
    '한예은',
    '오지호',
    '송서연',
    '조준우',
    '신지훈',
    '배예린',
    '허현수',
    '노소영',
    '서태민',
    '권지훈',
    '황예은',
    '문동혁',
    '안서아',
    '유준영',
    '전지수',
    '고민재',
    '홍서현',
    '김태우',
    '박서영',
    '이지호',
    '최예준',
    '정서아',
    '강민수',
    '윤지영',
    '임태현',
    '한서준',
    '오채민',
    '송예은',
    '조지호',
    '신서연',
    '배준우',
    '허지훈',
    '노예린',
    '서현수',
    '권소영',
    '황태민',
    '문지훈',
    '안예은',
    '유동혁',
    '전서아',
    '고준영',
    '홍지수',
    '김민재',
    '박서현',
    '이태우',
    '최서영',
    '정지호',
    '강예준',
    '윤서아',
    '임민수',
    '한지영',
    '오태현',
    '송서준',
    '조채민',
    '신예은',
    '배지호',
    '허서연',
    '노준우',
    '서지훈',
    '권예린',
    '황현수',
    '문소영',
    '안태민',
    '유지훈',
    '전예은',
    '고동혁',
    '홍서아',
    '김준영',
    '박지수',
    '이민재',
  ]

  const departments = ['기획', '영업', '마케팅', '캐스팅', '인사', '재무', 'IT', '디자인']
  const titles = ['사원', '대리', '과장', '팀장', '부장', '이사', '상무', '전무']

  return Array.from({ length: count }, (_, i) => ({
    id: `emp_${i + 1}`,
    name: names[i % names.length],
    department: departments[i % departments.length],
    title: titles[i % titles.length],
    joinedAt: `202${(i % 6) + 1}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    phone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    email: `${names[i % names.length].toLowerCase()}${i + 1}@company.com`,
    status: (['active', 'leave', 'terminated'] as const)[i % 3],
  }))
}

export function mockAttendance(count = 60): AttendanceRecord[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `att_${i + 1}`,
    date: `2025-09-${String((i % 28) + 1).padStart(2, '0')}`,
    employeeId: `emp_${(i % 20) + 1}`,
    clockIn: '09:00',
    clockOut: '18:00',
    workHours: 8,
    breakMinutes: 60,
    note: i % 9 === 0 ? '지각' : undefined,
  }))
}

export function mockPayroll(count = 40): PayrollItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `pay_${i + 1}`,
    month: `2025-0${(i % 9) + 1}`,
    employeeId: `emp_${(i % 20) + 1}`,
    department: ['기획', '영업', '마케팅', '캐스팅'][i % 4],
    amount: 3000000 + (i % 7) * 100000,
    deduction: (i % 3) * 50000,
    status: (['pending', 'paid', 'failed'] as const)[i % 3],
  }))
}

export function mockCandidates(count = 50, jobPostings: JobPosting[] = []): Candidate[] {
  const names = [
    '김지영',
    '박민수',
    '이서연',
    '최준호',
    '정유진',
    '강태현',
    '윤소영',
    '임동현',
    '한미영',
    '송지훈',
    '오나영',
    '배성민',
    '조현정',
    '신동욱',
    '권수빈',
    '홍성호',
    '문지은',
    '안태준',
    '송미경',
    '이현우',
    '김다은',
    '박준영',
    '정소영',
    '최민석',
  ]

  const positions = [
    '프론트엔드 개발자',
    '백엔드 개발자',
    '풀스택 개발자',
    '데이터 분석가',
    'UI/UX 디자이너',
    '마케팅 매니저',
    '영업 담당자',
    '인사 담당자',
    '재무 담당자',
    '고객지원 담당자',
    '프로덕트 매니저',
    'QA 엔지니어',
  ]

  const departments = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀', '재무팀']
  const sources = ['사이트', '추천', '헤드헌터', '구인구직사이트', 'SNS', '기타']
  const stages: Candidate['stage'][] = [
    'applied',
    'screening',
    'interview',
    'offer',
    'hired',
    'rejected',
  ]

  return Array.from({ length: count }, (_, i) => {
    // 랜덤하게 채용공고와 연결 (70% 확률로 연결)
    const jobPostingId =
      Math.random() > 0.3 && jobPostings.length > 0
        ? jobPostings[Math.floor(Math.random() * jobPostings.length)].id
        : undefined

    return {
      id: `candidate_${i + 1}`,
      name: names[i % names.length],
      position: positions[i % positions.length],
      department: departments[i % departments.length],
      experienceYears: Math.floor(Math.random() * 8) + 1,
      stage: stages[i % stages.length],
      source: sources[i % sources.length],
      owner: i % 3 === 0 ? '김담당자' : undefined,
      appliedAt: `2025-${String(Math.floor(Math.random() * 3) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      phone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      email: `candidate${i + 1}@example.com`,
      resumeUrl: i % 2 === 0 ? `resume_${i + 1}.pdf` : undefined,
      expectedSalary: 3000 + Math.floor(Math.random() * 5) * 500,
      note: i % 4 === 0 ? '우수한 후보자' : undefined,
      jobPostingId,
    }
  })
}

export function mockJobPostings(count = 12): JobPosting[] {
  const titles = [
    '프론트엔드 개발자',
    '백엔드 개발자',
    'UI/UX 디자이너',
    '마케팅 매니저',
    '데이터 분석가',
    '영업 담당자',
    '인사 담당자',
    '프로덕트 매니저',
    'QA 엔지니어',
    'DevOps 엔지니어',
    '고객지원 담당자',
    '재무 담당자',
  ]

  const departments = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀', '재무팀']
  const types: JobPosting['type'][0][] = ['full-time', 'part-time', 'contract', 'intern']
  const levels: JobPosting['level'][0][] = ['junior', 'mid', 'senior', 'lead']
  const statuses: JobPosting['status'][] = ['draft', 'active', 'paused', 'closed']

  return Array.from({ length: count }, (_, i) => {
    // 랜덤하게 여러 유형과 레벨 선택
    const selectedTypes: JobPosting['type'][0][] = []
    const selectedLevels: JobPosting['level'][0][] = []

    // 유형 선택 (1-3개)
    const typeCount = Math.floor(Math.random() * 3) + 1
    const shuffledTypes = [...types].sort(() => Math.random() - 0.5)
    for (let j = 0; j < typeCount && j < shuffledTypes.length; j++) {
      selectedTypes.push(shuffledTypes[j])
    }

    // 레벨 선택 (1-2개)
    const levelCount = Math.floor(Math.random() * 2) + 1
    const shuffledLevels = [...levels].sort(() => Math.random() - 0.5)
    for (let j = 0; j < levelCount && j < shuffledLevels.length; j++) {
      selectedLevels.push(shuffledLevels[j])
    }

    return {
      id: `job_${i + 1}`,
      title: titles[i],
      department: departments[i % departments.length],
      location: i % 2 === 0 ? '서울 본사' : '부산 지사',
      type: selectedTypes,
      level: selectedLevels,
      status: statuses[i % statuses.length],
      description: `${titles[i]} 포지션에 대한 상세 설명입니다.`,
      requirements: ['관련 업무 경험 3년 이상', '팀워크 능력', '문제 해결 능력'],
      benefits: ['성과급', '식대 지원', '교육비 지원'],
      salaryMin: 3000 + i * 200,
      salaryMax: 5000 + i * 300,
      postedAt:
        i % 4 !== 0
          ? `2025-${String(Math.floor(Math.random() * 3) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
          : undefined,
      closedAt:
        i % 8 === 0
          ? `2025-${String(Math.floor(Math.random() * 3) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
          : undefined,
      hiringManager: i % 2 === 0 ? '김매니저' : undefined,
    }
  })
}

export function mockAttendanceRecords(): AttendanceRecord[] {
  const employeeIds = Array.from({ length: 50 }, (_, i) => `emp_${i + 1}`)
  const records: AttendanceRecord[] = []

  // Generate records for the last 30 days
  const today = new Date()
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() - dayOffset)
    const dateStr = date.toISOString().split('T')[0]

    // Skip weekends for some employees
    const isWeekend = date.getDay() === 0 || date.getDay() === 6

    for (let i = 0; i < employeeIds.length; i++) {
      const employeeId = employeeIds[i]

      // 90% attendance rate
      const isPresent = Math.random() > 0.1

      if (!isPresent) {
        records.push({
          id: `att_${records.length + 1}`,
          date: dateStr,
          employeeId,
          note: '결근',
        })
        continue
      }

      // Skip weekends for some employees (70% skip rate)
      if (isWeekend && Math.random() < 0.7) {
        continue
      }

      // Generate clock in/out times
      const isLate = Math.random() < 0.15 // 15% late rate
      const isEarlyLeave = Math.random() < 0.08 // 8% early leave rate
      const isOvertime = Math.random() < 0.25 // 25% overtime rate

      let clockIn = '09:00'
      let clockOut = '18:00'
      let workHours = 8
      let note = ''

      if (isLate) {
        const lateMinutes = Math.floor(Math.random() * 60) + 10 // 10-70 minutes late
        const lateHour = 9 + Math.floor(lateMinutes / 60)
        const lateMin = lateMinutes % 60
        clockIn = `${String(lateHour).padStart(2, '0')}:${String(lateMin).padStart(2, '0')}`
        note = '지각'
      }

      if (isEarlyLeave) {
        const earlyMinutes = Math.floor(Math.random() * 120) + 30 // 30-150 minutes early
        const earlyHour = 18 - Math.floor(earlyMinutes / 60)
        const earlyMin = 60 - (earlyMinutes % 60)
        clockOut = `${String(earlyHour).padStart(2, '0')}:${String(earlyMin).padStart(2, '0')}`
        workHours = Math.max(6, workHours - earlyMinutes / 60)
        note = note ? note + ', 조기퇴근' : '조기퇴근'
      }

      if (isOvertime) {
        const overtimeHours = Math.floor(Math.random() * 4) + 1 // 1-4 hours overtime
        const overtimeHour = 18 + overtimeHours
        clockOut = `${String(overtimeHour).padStart(2, '0')}:00`
        workHours = 8 + overtimeHours
        note = note ? note + ', 야근' : '야근'
      }

      records.push({
        id: `att_${records.length + 1}`,
        date: dateStr,
        employeeId,
        clockIn,
        clockOut,
        workHours: Math.round(workHours * 10) / 10,
        breakMinutes: Math.floor(Math.random() * 60) + 30, // 30-90 minutes break
        note: note || undefined,
      })
    }
  }

  return records.sort((a, b) => b.date.localeCompare(a.date))
}

export function mockPayrollItems(): PayrollItem[] {
  const employeeIds = Array.from({ length: 50 }, (_, i) => `emp_${i + 1}`)
  const departments = ['기획', '영업', '마케팅', '캐스팅', '인사', '재무', 'IT', '디자인']

  const records: PayrollItem[] = []

  // Generate records for the last 12 months
  const today = new Date()
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    for (let i = 0; i < employeeIds.length; i++) {
      const employeeId = employeeIds[i]
      const department = departments[i % departments.length]

      // Base salary varies by department and employee
      const baseSalary = 3000 + i * 200 + Math.floor(Math.random() * 1000)
      const deduction = Math.floor(baseSalary * 0.1) + Math.floor(Math.random() * 200) // 10% + random
      const amount = baseSalary - deduction

      // Status distribution: 80% paid, 15% pending, 5% failed
      const statusRandom = Math.random()
      let status: PayrollItem['status']
      if (statusRandom < 0.8) {
        status = 'paid'
      } else if (statusRandom < 0.95) {
        status = 'pending'
      } else {
        status = 'failed'
      }

      records.push({
        id: `payroll_${records.length + 1}`,
        month: monthStr,
        employeeId,
        department,
        amount,
        deduction,
        status,
      })
    }
  }

  return records.sort((a, b) => b.month.localeCompare(a.month))
}

// 교육 관리 Mock 데이터
export function mockTrainingCourses(): TrainingCourse[] {
  return [
    {
      id: 'course_1',
      title: 'React 개발 기초',
      description: 'React 라이브러리를 이용한 웹 개발의 기초를 학습합니다.',
      category: 'technical',
      duration: 40,
      maxParticipants: 20,
      instructor: '김개발',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      location: '온라인',
      cost: 500000,
      prerequisites: ['JavaScript 기초', 'HTML/CSS'],
      objectives: ['React 컴포넌트 작성', '상태 관리', '라우팅 구현'],
    },
    {
      id: 'course_2',
      title: '리더십 스킬 개발',
      description: '효과적인 팀 리딩과 커뮤니케이션 스킬을 향상시킵니다.',
      category: 'leadership',
      duration: 24,
      maxParticipants: 15,
      instructor: '박리더',
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-02-10',
      location: '회의실 A',
      cost: 800000,
      prerequisites: ['3년 이상 경력'],
      objectives: ['팀 빌딩', '갈등 해결', '의사결정 스킬'],
    },
    {
      id: 'course_3',
      title: '정보보안 인식 교육',
      description: '개인정보보호법 및 정보보안 기본 교육',
      category: 'compliance',
      duration: 8,
      maxParticipants: 50,
      instructor: '이보안',
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2023-12-01',
      location: '대강당',
      cost: 0,
      objectives: ['개인정보보호 이해', '보안 위험 인식', '안전한 업무 환경'],
    },
    {
      id: 'course_4',
      title: '디자인 씽킹 워크샵',
      description: '창의적 문제해결 방법론을 통한 혁신적 사고 개발',
      category: 'soft-skills',
      duration: 16,
      maxParticipants: 12,
      instructor: '최디자인',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      location: '워크샵룸',
      cost: 600000,
      objectives: ['공감대 형성', '아이디어 발상', '프로토타이핑'],
    },
  ]
}

export function mockTrainingEnrollments(): TrainingEnrollment[] {
  const courses = mockTrainingCourses()
  const employees = mockEmployees(50)
  const enrollments: TrainingEnrollment[] = []

  courses.forEach((course) => {
    const enrollmentCount = Math.floor(Math.random() * (course.maxParticipants || 20)) + 5

    for (let i = 0; i < enrollmentCount; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)]
      const statuses: TrainingEnrollment['status'][] = [
        'enrolled',
        'in_progress',
        'completed',
        'dropped',
      ]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      enrollments.push({
        id: `enroll_${enrollments.length + 1}`,
        courseId: course.id,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        status,
        enrolledAt: '2024-01-10',
        completedAt: status === 'completed' ? '2024-02-15' : undefined,
        score: status === 'completed' ? Math.floor(Math.random() * 20) + 80 : undefined,
        feedback: status === 'completed' ? '유익한 교육이었습니다.' : undefined,
      })
    }
  })

  return enrollments
}

// 복리후생 Mock 데이터
export function mockBenefitCategories(): BenefitCategory[] {
  return [
    {
      id: 'benefit_1',
      name: '건강검진',
      description: '연간 종합건강검진 지원',
      budget: 50000000,
      usedAmount: 32000000,
      status: 'active',
    },
    {
      id: 'benefit_2',
      name: '교육비 지원',
      description: '직무 관련 교육비 및 도서구입비 지원',
      budget: 30000000,
      usedAmount: 18000000,
      status: 'active',
    },
    {
      id: 'benefit_3',
      name: '휴양시설 이용',
      description: '휴양시설 및 리조트 이용권 제공',
      budget: 20000000,
      usedAmount: 8500000,
      status: 'active',
    },
    {
      id: 'benefit_4',
      name: '식대 지원',
      description: '점심 식대 및 간식비 지원',
      budget: 10000000,
      usedAmount: 7500000,
      status: 'active',
    },
  ]
}

export function mockBenefitRequests(): BenefitRequest[] {
  const categories = mockBenefitCategories()
  const employees = mockEmployees(50)
  const requests: BenefitRequest[] = []

  for (let i = 0; i < 80; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const employee = employees[Math.floor(Math.random() * employees.length)]
    const statuses: BenefitRequest['status'][] = ['requested', 'approved', 'rejected', 'processed']
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    requests.push({
      id: `benefit_req_${i + 1}`,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      categoryId: category.id,
      categoryName: category.name,
      amount: Math.floor(Math.random() * 500000) + 50000,
      description: `${category.name} 관련 신청`,
      status,
      requestedAt: '2024-01-15',
      processedAt: status !== 'requested' ? '2024-01-20' : undefined,
      approvedBy: status === 'approved' ? '김승인' : undefined,
      note: status === 'rejected' ? '예산 초과' : undefined,
    })
  }

  return requests
}

// 성과평가 Mock 데이터
export function mockPerformanceGoals(): PerformanceGoal[] {
  const employees = mockEmployees(30)
  const goals: PerformanceGoal[] = []

  employees.forEach((employee) => {
    const goalCount = Math.floor(Math.random() * 3) + 2 // 2-4 goals per employee

    for (let i = 0; i < goalCount; i++) {
      const categories: PerformanceGoal['category'][] = ['work', 'development', 'behavior']
      const category = categories[Math.floor(Math.random() * categories.length)]

      goals.push({
        id: `goal_${goals.length + 1}`,
        employeeId: employee.id,
        title: `목표 ${i + 1}`,
        description: `${category} 관련 목표 설명`,
        category,
        targetValue: '100%',
        actualValue: Math.floor(Math.random() * 50) + 50 + '%',
        weight: Math.floor(Math.random() * 30) + 20,
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        progress: Math.floor(Math.random() * 100),
      })
    }
  })

  return goals
}

export function mockPerformanceReviews(): PerformanceReview[] {
  const employees = mockEmployees(20)
  const reviews: PerformanceReview[] = []
  const quarters = ['2023-Q4', '2024-Q1']

  employees.forEach((employee) => {
    quarters.forEach((quarter) => {
      const overallRating = Math.floor(Math.random() * 3) + 3 // 3-5 rating
      const statuses: PerformanceReview['status'][] = ['completed', 'in_progress', 'draft']
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      reviews.push({
        id: `review_${reviews.length + 1}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        reviewerId: 'manager_1',
        reviewerName: '박매니저',
        period: quarter,
        status,
        overallRating,
        goals: [], // Will be populated separately
        strengths: ['협업 능력', '문제 해결 능력', '학습 의지'],
        improvements: ['의사소통 스킬', '시간 관리'],
        feedback: '전반적으로 만족스러운 성과를 보여주고 있습니다.',
        nextGoals: ['더 나은 커뮤니케이션', '리더십 스킬 개발'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        completedAt: status === 'completed' ? '2024-01-20' : undefined,
      })
    })
  })

  return reviews
}

export function mockPerformanceFeedbacks(): PerformanceFeedback[] {
  const employees = mockEmployees(30)
  const reviews = mockPerformanceReviews()
  const feedbacks: PerformanceFeedback[] = []

  reviews.forEach((review) => {
    const feedbackCount = Math.floor(Math.random() * 3) + 1 // 1-3 feedbacks per review

    for (let i = 0; i < feedbackCount; i++) {
      const fromEmployee = employees[Math.floor(Math.random() * employees.length)]
      const categories: PerformanceFeedback['category'][] = ['peer', 'subordinate', 'self']
      const category = categories[Math.floor(Math.random() * categories.length)]

      feedbacks.push({
        id: `feedback_${feedbacks.length + 1}`,
        reviewId: review.id,
        fromEmployeeId: fromEmployee.id,
        fromEmployeeName: fromEmployee.name,
        toEmployeeId: review.employeeId,
        toEmployeeName: review.employeeName,
        category,
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 rating
        feedback: `${category} 관점에서의 피드백 내용입니다.`,
        submittedAt: '2024-01-10',
      })
    }
  })

  return feedbacks
}
