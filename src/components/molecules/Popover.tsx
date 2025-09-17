/**
 * Popover: Radix Popover 기반 간단 팝오버. side/align으로 포지셔닝.
 * - 트리거 너비를 측정하여 콘텐츠 너비를 맞추되,
 * - 너무 작을 땐 최소 너비를 보장하고, 뷰포트 기준 최대 너비를 적용합니다.
 */
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ReactNode } from 'react'
import { useState } from 'react'

type PopoverRenderApi = { close: () => void }
type PopoverProps = {
  trigger: ReactNode
  children: ReactNode | ((api: PopoverRenderApi) => ReactNode)
  onOpenChange?: (open: boolean) => void
}

export function Popover({ trigger, children, onOpenChange }: PopoverProps) {
  const [open, setOpen] = useState(false)

  const viewportMax = typeof window !== 'undefined' ? Math.max(320, window.innerWidth - 32) : 960
  const minWidth = 0
  const hardMax = 960
  const maxWidth = Math.min(viewportMax, hardMax)
  // width is determined via CSS (max-content) with min/max bounds

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        onOpenChange?.(newOpen)
      }}
    >
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions
          collisionPadding={8}
          style={{
            zIndex: 1000,
            // Let content expand to fit chips while respecting min/max
            width: 'max-content',
            minWidth,
            maxWidth,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 8,
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              padding: '12px 16px',
              whiteSpace: 'normal',
              maxHeight: '85vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
