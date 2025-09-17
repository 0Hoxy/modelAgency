/**
 * Dashboard Settings Page
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { useState } from 'react'

export default function DashboardSettings() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')

  return (
    <SidebarLayout>
      <h2 style={{ marginTop: 0 }}>설정</h2>
      <form
        style={{
          display: 'grid',
          gap: 12,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          background: '#fff',
          maxWidth: 520,
        }}
        onSubmit={(e) => {
          e.preventDefault()
          alert('설정이 저장되었습니다.')
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={(e) => setEmailNotif(e.target.checked)}
          />
          이메일 알림 받기
        </label>

        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#64748b' }}>테마</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['system', 'light', 'dark'].map((t) => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="theme"
                  value={t}
                  checked={theme === (t as typeof theme)}
                  onChange={() => setTheme(t as typeof theme)}
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div>
          <button type="submit" className="iconBtn" style={{ border: '1px solid #e2e8f0' }}>
            저장
          </button>
        </div>
      </form>
    </SidebarLayout>
  )
}
