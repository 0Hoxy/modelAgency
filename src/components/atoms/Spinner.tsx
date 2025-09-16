/**
 * Spinner: 로딩 상태 표시용 스피너 아톰. size로 크기 조절.
 */
import type { HTMLAttributes } from 'react'

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export function Spinner({ size = 16, style, ...props }: SpinnerProps) {
  const border = Math.max(2, Math.round(size / 8))
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${border}px solid #e2e8f0`,
        borderTopColor: '#2563eb',
        animation: 'spin 0.8s linear infinite',
        ...style,
      }}
      {...props}
    />
  )
}
