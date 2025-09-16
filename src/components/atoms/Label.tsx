/**
 * Label: 폼 라벨 아톰. requiredMark로 필수 표시(*)를 추가할 수 있음.
 */
import type { LabelHTMLAttributes, ReactNode } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  requiredMark?: boolean
  children: ReactNode
}

export function Label({ children, requiredMark, style, ...props }: LabelProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }} {...props}>
      <span>{children}</span>
      {requiredMark && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
  )
}
