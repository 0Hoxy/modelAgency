/**
 * Badge: 간단한 상태/라벨 표기를 위한 배지 아톰. color로 스타일 제어.
 */
import type { HTMLAttributes } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: 'primary' | 'gray' | 'success' | 'danger'
}

export function Badge({ color = 'gray', style, ...props }: BadgeProps) {
  const map = {
    primary: { bg: '#eff6ff', fg: '#2563eb' },
    gray: { bg: '#f1f5f9', fg: '#334155' },
    success: { bg: '#ecfdf5', fg: '#059669' },
    danger: { bg: '#fef2f2', fg: '#ef4444' },
  } as const
  const c = map[color]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 12,
        background: c.bg,
        color: c.fg,
        ...style,
      }}
      {...props}
    />
  )
}
