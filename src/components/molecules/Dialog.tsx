/**
 * Dialog: Radix UI 기반 모달 컴포넌트 래퍼. 제목/설명/닫기 버튼 포함.
 */
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'

type DialogProps = {
  trigger: ReactNode
  title?: string
  description?: string
  children: ReactNode
}

export function Dialog({ trigger, title, description, children }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)' }}
        />
        <DialogPrimitive.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: 12,
            width: 'min(480px, 90vw)',
            padding: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}
        >
          {title && (
            <DialogPrimitive.Title style={{ margin: 0, fontSize: 18 }}>
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description style={{ marginTop: 8, color: '#475569' }}>
              {description}
            </DialogPrimitive.Description>
          )}
          <div style={{ marginTop: 16 }}>{children}</div>
          <DialogPrimitive.Close
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'transparent',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
