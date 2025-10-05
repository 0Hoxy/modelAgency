export type MetricsRow = { metric: string; value: string | number; change?: string }
export type MetricsTableProps = { rows: MetricsRow[]; title?: string }

export function MetricsTable({ rows, title }: MetricsTableProps) {
  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff' }}>
      {title ? <h3 style={{ padding: '12px 12px 0 12px', margin: 0 }}>{title}</h3> : null}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                whiteSpace: 'nowrap',
              }}
            >
              지표
            </th>
            <th
              style={{
                textAlign: 'right',
                padding: '8px 10px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                whiteSpace: 'nowrap',
              }}
            >
              값
            </th>
            <th
              style={{
                textAlign: 'right',
                padding: '8px 10px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                whiteSpace: 'nowrap',
              }}
            >
              변화
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.metric}>
              <td
                style={{
                  padding: '8px 10px',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                }}
              >
                {r.metric}
              </td>
              <td
                style={{
                  padding: '8px 10px',
                  borderTop: '1px solid #e2e8f0',
                  textAlign: 'right',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                }}
              >
                {r.value}
              </td>
              <td
                style={{
                  padding: '8px 10px',
                  borderTop: '1px solid #e2e8f0',
                  textAlign: 'right',
                  color: '#16a34a',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                }}
              >
                {r.change ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
