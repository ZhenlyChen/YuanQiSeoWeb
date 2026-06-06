export type DirectoryQueryHref = {
  pathname: string
  query?: Record<string, string>
}

export function buildDirectoryQueryHref(input: {
  pathname: string
  searchParams: URLSearchParams
  sort: 'popular' | 'name'
  next?: { sort?: 'popular' | 'name'; page?: number }
  pagination?: { page: number }
}): DirectoryQueryHref {
  const params = new URLSearchParams(input.searchParams.toString())
  const nextSort = input.next?.sort ?? input.sort

  if (nextSort === 'popular') params.delete('sort')
  else params.set('sort', nextSort)

  if (input.pagination) {
    const nextPage = input.next?.page ?? input.pagination.page
    if (nextPage <= 1) params.delete('page')
    else params.set('page', String(nextPage))
  }

  const query: Record<string, string> = {}
  params.forEach((value, key) => {
    query[key] = value
  })

  return Object.keys(query).length > 0
    ? { pathname: input.pathname, query }
    : { pathname: input.pathname }
}
