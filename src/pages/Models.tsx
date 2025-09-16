/**
 * Models: 모델 목록을 표시하는 페이지 예시.
 */
import { QueryState } from '@molecules/QueryState'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@templates/MainLayout'
import { http, UsersSchema } from '@utils/http'

export default function Models() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const res = await http.get('https://jsonplaceholder.typicode.com/users')
      return UsersSchema.parse(res.data)
    },
  })
  return (
    <MainLayout>
      <h2>모델 리스트</h2>
      <QueryState isLoading={isLoading} error={error} data={data}>
        {(list) => (
          <ul>
            {list.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        )}
      </QueryState>
    </MainLayout>
  )
}
