/**
 * utils/number: 숫자 유틸. 포맷/클램프 등 제공.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}


