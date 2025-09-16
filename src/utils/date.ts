/**
 * utils/date: 날짜 유틸. 포맷 및 파싱 간단 헬퍼.
 */
export function formatDate(date: Date, locale = 'ko-KR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
