import { useState } from 'react'

export type BarSparkProps = {
  heights: number[]
  maxHeight?: number
  barWidth?: number
  gap?: number
  labels?: string[]
  showValues?: boolean
  showTooltip?: boolean
}

export function BarSpark({
  heights,
  maxHeight = 120,
  barWidth = 18,
  gap = 6,
  labels,
  showValues = true,
  showTooltip = true,
}: BarSparkProps) {
  const max = Math.max(...heights, 1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap, height: maxHeight + 40 }}>
        {heights.map((h, i) => {
          const barHeight = Math.round((h / max) * maxHeight)
          const isHovered = hoveredIndex === i

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* 값 표시 */}
              {showValues && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isHovered ? '#2563eb' : '#374151',
                    marginBottom: '4px',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {h}
                </div>
              )}

              {/* 막대 */}
              <div
                style={{
                  position: 'relative',
                  width: barWidth,
                  height: barHeight + 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    width: barWidth,
                    height: barHeight,
                    background: isHovered ? '#2563eb' : '#93c5fd',
                    borderRadius: 6,
                    transition: 'all 0.2s ease',
                    cursor: showTooltip ? 'pointer' : 'default',
                    boxShadow: isHovered ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none',
                  }}
                />

                {/* 툴팁 */}
                {showTooltip && isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: barHeight + 25,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#1f2937',
                      color: 'white',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {labels && labels[i] ? `${labels[i]}: ${h}명` : `${h}명`}
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: '4px solid #1f2937',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 라벨 표시 */}
              {labels && labels[i] && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#374151',
                    marginTop: '6px',
                    textAlign: 'center',
                    minWidth: barWidth + gap,
                    lineHeight: 1.2,
                    wordBreak: 'keep-all',
                  }}
                >
                  {labels[i]}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
