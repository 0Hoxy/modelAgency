/**
 * Popover: Radix Popover 기반 간단 팝오버. side/align으로 포지셔닝.
 * - 트리거 너비를 측정하여 콘텐츠 너비를 맞추되,
 * - 너무 작을 땐 최소 너비를 보장하고, 뷰포트 기준 최대 너비를 적용합니다.
 */
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ReactNode } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

type PopoverProps = {
  trigger: ReactNode
  children: ReactNode
}

export function Popover({ trigger, children }: PopoverProps) {
  const triggerRef = useRef<HTMLElement | null>(null)
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    const measure = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setTriggerWidth(rect.width)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const minWidth = 200
  const contentWidth = Math.max(triggerWidth ?? 0, minWidth)

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        asChild
        ref={triggerRef as unknown as React.RefObject<HTMLButtonElement>}
      >
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions
          collisionPadding={8}
          style={{
            zIndex: 1000,
            width: contentWidth,
            minWidth,
            maxWidth: 'calc(100vw - 24px)',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 8,
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              padding: 12,
              whiteSpace: 'nowrap',
            }}
          >
            {children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
