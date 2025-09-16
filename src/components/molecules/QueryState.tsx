/**
 * QueryState: React Query 상태(로딩/에러/빈값) 핸들링을 단순화하는 몰리큘.
 */
import { Alert } from '@atoms/Alert'
import { Spinner } from '@atoms/Spinner'
import type { ReactNode } from 'react'

type QueryStateProps<T> = {
  isLoading: boolean
  error: unknown
  data: T | undefined
  loading?: ReactNode
  empty?: ReactNode
  children: (data: NonNullable<T>) => ReactNode
}

export function QueryState<T>({
  isLoading,
  error,
  data,
  loading,
  empty,
  children,
}: QueryStateProps<T>) {
  if (isLoading) return <>{loading ?? <Spinner />}</>
  if (error) return <Alert variant="error">에러가 발생했습니다.</Alert>
  if (!data || (Array.isArray(data) && data.length === 0))
    return <>{empty ?? <div>데이터 없음</div>}</>
  return <>{children(data as NonNullable<T>)}</>
}
