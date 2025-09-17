export type ActivityItem = { when: string; text: string }
export type ActivityFeedProps = { items: ActivityItem[] }

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>최근 활동</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map((a, idx) => (
          <li key={idx} style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#64748b', fontSize: 12, width: 64 }}>{a.when}</span>
            <span style={{ fontSize: 14 }}>{a.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
