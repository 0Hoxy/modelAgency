/**
 * Input: 텍스트 입력 필드 아톰. invalid로 에러 스타일 표시.
 */
import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, style, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: 8,
        border: `1px solid ${invalid ? '#ef4444' : '#cbd5e1'}`,
        outline: 'none',
        boxShadow: 'none',
        ...(style || {}),
      }}
    />
  )
})
