/**
 * utils/dom: DOM 관련 유틸. 브라우저 환경에서만 동작하는 헬퍼.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}


