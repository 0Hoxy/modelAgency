/**
 * TextField: 라벨/도움말/에러 메시지를 포함한 텍스트 입력 몰리큘.
 */
import { Input } from '@atoms/Input'
import { Label } from '@atoms/Label'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
  helpText?: ReactNode
  error?: ReactNode
  requiredMark?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, helpText, error, requiredMark, style, ...props },
  ref,
) {
  const describedBy = [helpText ? `${id}-help` : undefined, error ? `${id}-error` : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div style={{ display: 'grid', gap: 6, ...style }}>
      {label && (
        <Label htmlFor={id} requiredMark={requiredMark}>
          {label}
        </Label>
      )}
      <Input
        ref={ref}
        id={id}
        aria-describedby={describedBy || undefined}
        invalid={!!error}
        {...props}
      />
      {helpText && (
        <div id={`${id}-help`} style={{ color: '#64748b', fontSize: 12 }}>
          {helpText}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} style={{ color: '#ef4444', fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  )
})
