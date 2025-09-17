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
  labelStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
  leading?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, helpText, error, requiredMark, style, labelStyle, inputStyle, leading, ...props },
  ref,
) {
  const describedBy = [helpText ? `${id}-help` : undefined, error ? `${id}-error` : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div style={{ display: 'grid', gap: 6, ...style }}>
      {label && (
        <Label htmlFor={id} requiredMark={requiredMark} style={labelStyle}>
          {label}
        </Label>
      )}
      <div style={{ position: 'relative' }}>
        {leading && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              color: '#64748b',
            }}
          >
            {leading}
          </span>
        )}
        <Input
          ref={ref}
          id={id}
          aria-describedby={describedBy || undefined}
          invalid={!!error}
          {...props}
          style={{
            paddingLeft: leading ? 32 : undefined,
            ...(inputStyle || {}),
          }}
        />
      </div>
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
