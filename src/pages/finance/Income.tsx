/**
 * Finance - Income (수익 관리) - 스켈레톤
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { Download, Filter, Plus } from 'lucide-react'

export default function FinanceIncome() {
  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 0,
                marginBottom: 4,
              }}
            >
              수익 관리
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>회사의 모든 수익 내역을 관리합니다</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Download size={16} />
              내보내기
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Plus size={16} />
              수익 등록
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  총 수익
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#16a34a',
                    margin: 0,
                  }}
                >
                  ₩0
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  0건의 수익
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#f0fdf4',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>💰</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  이번 달 수익
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#2563eb',
                    margin: 0,
                  }}
                >
                  ₩0
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  현재 월 기준
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#eff6ff',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>📅</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  미수금
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#d97706',
                    margin: 0,
                  }}
                >
                  ₩0
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  수금 대기중
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fef3c7',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          style={{
            background: 'white',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="설명, 고객명으로 검색..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              <Filter size={16} />
              필터
            </button>
          </div>
        </div>

        {/* Income Table */}
        <div
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    날짜
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    카테고리
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    설명
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    고객
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'right',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    금액
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    결제방법
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    송장번호
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: 40,
                      textAlign: 'center',
                      color: '#64748b',
                    }}
                  >
                    수익 데이터가 없습니다
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
