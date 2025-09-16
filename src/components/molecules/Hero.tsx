/**
 * Hero: 페이지 상단의 소개 섹션 몰리큘. 제목/부제/CTA 버튼 제공.
 */
import { Button } from '@atoms/Button'
import { Heading } from '@atoms/Heading'
import type { ReactNode } from 'react'

type HeroProps = {
  title: string
  subtitle?: ReactNode
  ctaLabel?: string
  onCtaClick?: () => void
}

export function Hero({ title, subtitle, ctaLabel = '시작하기', onCtaClick }: HeroProps) {
  return (
    <section style={{ padding: '56px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <Heading level={1} style={{ fontSize: 40, marginBottom: 12 }}>
          {title}
        </Heading>
        {subtitle && <p style={{ marginTop: 0, marginBottom: 24, color: '#475569' }}>{subtitle}</p>}
        {ctaLabel && <Button onClick={onCtaClick}>{ctaLabel}</Button>}
      </div>
    </section>
  )
}
