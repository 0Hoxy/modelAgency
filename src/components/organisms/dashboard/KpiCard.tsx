export type KpiCardProps = {
  label: string
  value: string | number
  delta?: string
  icon?: React.ReactNode
  accentColor?: string
  description?: string
}

export function KpiCard({
  label,
  value,
  delta,
  icon,
  accentColor = '#2563eb',
  description,
}: KpiCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 16,
        background: '#fff',
        display: 'grid',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon ? (
          <span
            aria-hidden
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              display: 'grid',
              placeItems: 'center',
              background: `${accentColor}1A`,
              color: accentColor,
            }}
          >
            {icon}
          </span>
        ) : null}
        <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      {description ? <div style={{ color: '#64748b', fontSize: 12 }}>{description}</div> : null}
      {delta ? <div style={{ color: '#16a34a', fontSize: 12 }}>{delta}</div> : null}
    </div>
  )
}
