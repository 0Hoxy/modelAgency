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

export default function Home() {
  return (
    <MainLayout>
      <Hero
        title="모델 에이전시"
        subtitle="Atomic Design 구조로 구성된 React 템플릿"
        ctaLabel="둘러보기"
      />
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
