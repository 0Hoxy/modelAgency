/**
 * Heading: 제목 텍스트 아톰. level(1~6)에 따라 h태그를 동적으로 렌더링.
 */
import type { ElementType,HTMLAttributes, ReactNode } from 'react'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
}

export function Heading({ level = 1, children, style, ...props }: HeadingProps) {
  const Tag = `h${level}` as unknown as ElementType
  return (
    <Tag style={{ margin: 0, lineHeight: 1.2, ...style }} {...props}>
      {children}
    </Tag>
  )
}
