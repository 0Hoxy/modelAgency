/**
 * Home: 랜딩/샘플 페이지. 기본 컴포넌트 사용 예시를 보여줌.
 */
import { Badge } from '@atoms/Badge'
import { Button } from '@atoms/Button'
import { Spinner } from '@atoms/Spinner'
import { Dialog } from '@molecules/Dialog'
import { Hero } from '@molecules/Hero'
import { Popover } from '@molecules/Popover'
import { TextField } from '@molecules/TextField'
import { MainLayout } from '@templates/MainLayout'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <MainLayout>
      <Hero
        title="모델 에이전시"
        subtitle="Atomic Design 구조로 구성된 React 템플릿"
        ctaLabel="둘러보기"
      />

      {/* 모델 등록 버튼 */}
      <div style={{ marginTop: '32px', marginBottom: '32px' }}>
        <button
          onClick={() => navigate('/registration')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(102, 126, 234, 0.3)'
          }}
        >
          <UserPlus size={24} />
          모델 등록하기
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Dialog
          trigger={<Button>다이얼로그 열기</Button>}
          title="Radix Dialog"
          description="Radix UI 기반 다이얼로그"
        >
          <p style={{ margin: 0 }}>내용 예시</p>
        </Dialog>
        <Popover trigger={<Button variant="secondary">팝오버 열기</Button>}>
          <div style={{ width: 200 }}>Floating UI로 포지셔닝되는 팝오버</div>
        </Popover>
      </div>
      <div style={{ display: 'grid', gap: 12, marginTop: 24, maxWidth: 360 }}>
        <TextField
          id="name"
          label="이름"
          placeholder="홍길동"
          requiredMark
          helpText="실명으로 입력해 주세요"
        />
        <TextField
          id="email"
          label="이메일"
          placeholder="you@example.com"
          error="올바른 이메일을 입력하세요"
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge color="primary">NEW</Badge>
          <Badge color="success">ACTIVE</Badge>
          <Badge color="danger">BANNED</Badge>
          <Spinner />
        </div>
      </div>
    </MainLayout>
  )
}
