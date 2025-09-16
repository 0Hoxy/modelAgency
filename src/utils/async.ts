/**
 * utils/async: 비동기 유틸 모음. sleep, retry 등의 헬퍼 제공.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 200): Promise<T> {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < attempts - 1) await sleep(delayMs)
    }
  }
  throw lastError
}


