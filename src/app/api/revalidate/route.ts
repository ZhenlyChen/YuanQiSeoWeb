import { revalidatePath } from 'next/cache'
import { routing } from '@/i18n/routing'

type RevalidateBody = {
  paths?: string[]
}

function unauthorized() {
  return Response.json({ message: 'Unauthorized' }, { status: 401 })
}

function appendLocalizedPaths(paths: Set<string>, canonicalPath: string) {
  const normalized = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
  paths.add(normalized)
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue
    paths.add(`/${locale}${normalized}`)
  }
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim()
  if (!secret) {
    return Response.json({ message: 'REVALIDATE_SECRET is not configured' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization') ?? ''
  if (authHeader !== `Bearer ${secret}`) {
    return unauthorized()
  }

  let body: RevalidateBody
  try {
    body = (await request.json()) as RevalidateBody
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const inputPaths = Array.isArray(body.paths) ? body.paths.filter(Boolean) : []
  if (!inputPaths.length) {
    return Response.json({ message: 'Missing paths' }, { status: 400 })
  }

  const paths = new Set<string>()
  for (const path of inputPaths) {
    appendLocalizedPaths(paths, path)
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  return Response.json({
    revalidated: true,
    paths: [...paths],
  })
}
