export type BarSparkProps = {
  heights: number[]
  maxHeight?: number
  barWidth?: number
  gap?: number
}

export function BarSpark({ heights, maxHeight = 120, barWidth = 18, gap = 6 }: BarSparkProps) {
  const max = Math.max(...heights, 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap, height: maxHeight + 20 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            height: Math.round((h / max) * maxHeight) + 20,
            background: '#93c5fd',
            borderRadius: 6,
          }}
        />
      ))}
    </div>
  )
}
