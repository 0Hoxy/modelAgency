/**
 * Button: 기본 버튼 아톰 컴포넌트. variant로 스타일(기본/세컨더리/고스트) 제어.
 */
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      style={{
        padding: '8px 14px',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        ...(variant === 'primary' && { backgroundColor: 'var(--color-primary)', color: 'white' }),
        ...(variant === 'secondary' && { backgroundColor: '#e2e8f0', color: '#0f172a' }),
        ...(variant === 'ghost' && {
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-primary)',
        }),
      }}
      className={className}
      {...props}
    />
  )
}
