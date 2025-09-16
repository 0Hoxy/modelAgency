/**
 * Alert: 상태/피드백 메시지 표시용 아톰. variant로 색상 구분.
 */
import type { HTMLAttributes, ReactNode } from 'react'

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: ReactNode
}

export function Alert({ variant = 'info', title, children, style, ...props }: AlertProps) {
  const map = {
    info: { bg: '#eff6ff', fg: '#1d4ed8', border: '#bfdbfe' },
    success: { bg: '#ecfdf5', fg: '#059669', border: '#a7f3d0' },
    warning: { bg: '#fffbeb', fg: '#b45309', border: '#fde68a' },
    error: { bg: '#fef2f2', fg: '#ef4444', border: '#fecaca' },
  } as const
  const c = map[variant]
  return (
    <div
      role="alert"
      style={{
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        padding: 12,
        ...style,
      }}
      {...props}
    >
      {title && <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>}
      {children}
    </div>
  )
}
