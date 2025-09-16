/**
 * utils/array: 배열 유틸 모음. 정렬/그룹화/중복 제거 등 관련 함수 제공.
 */
export function uniqueArray<T>(list: readonly T[]): T[] {
  return Array.from(new Set(list))
}


