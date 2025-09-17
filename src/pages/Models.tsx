/**
 * Models: 모델 목록을 표시하는 페이지 예시.
 */
import { QueryState } from '@molecules/QueryState'
import { useQuery } from '@tanstack/react-query'
import { SidebarLayout } from '@templates/SidebarLayout'
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
    <SidebarLayout>
      <QueryState isLoading={isLoading} error={error} data={data}>
        {(list) => (
          <ul>
            {list.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        )}
      </QueryState>
    </SidebarLayout>
  )
}
