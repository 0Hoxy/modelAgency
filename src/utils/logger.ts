/**
 * utils/logger: 로거 유틸. 환경에 따라 로깅 레벨 제어.
 */
export const logger = {
  info: (...args: unknown[]) => console.info('[info]', ...args),
  warn: (...args: unknown[]) => console.warn('[warn]', ...args),
  error: (...args: unknown[]) => console.error('[error]', ...args),
}


