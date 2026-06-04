/** Untitled UI line icons (24×24 grid, 2px stroke). Paths from @untitledui/icons / Lucide (shadcn). */
export function UntitledUiLineIcon({
  path,
  paths,
  size = 24,
  strokeWidth = 2,
  className,
}: {
  path?: string
  paths?: string[]
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const segments = paths ?? (path ? [path] : [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {segments.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export type UntitledUiIconPath = string | string[]

const UNTITLED_UI_PATHS = {
  stars02:
    'M4.5 22v-5m0-10V2M2 4.5h5m-5 15h5M13 3l-1.734 4.509c-.282.733-.423 1.1-.643 1.408a3 3 0 0 1-.706.707c-.308.219-.675.36-1.408.642L4 12l4.509 1.734c.733.282 1.1.423 1.408.643.273.194.512.433.707.706.219.308.36.675.642 1.408L13 21l1.734-4.509c.282-.733.423-1.1.643-1.408.194-.273.433-.512.706-.707.308-.219.675-.36 1.408-.642L22 12l-4.509-1.734c-.733-.282-1.1-.423-1.408-.642a3 3 0 0 1-.706-.707c-.22-.308-.36-.675-.643-1.408L13 3Z',
  /** Untitled UI list — bulleted rows */
  list: 'M21 12H9m12-6H9m12 12H9m-4-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
  /** Untitled UI grid-01 — corner layout (graph view) */
  layoutGrid:
    'M9 3.5H4.5M9 9.5V4.5M4.5 9.5V4.5M19.5 3.5H14.5M19.5 9.5V14.5M14.5 9.5V4.5M9 14.5H4.5M9 19.5V14.5M4.5 19.5V14.5M19.5 14.5H14.5M19.5 19.5V14.5M14.5 19.5V14.5',
  hash02: 'm9.5 3-3 18m11-18-3 18m6-13h-17m16 8h-17',
  file06:
    'M14 2.27V6.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.11.494.11 1.054.11h4.13M16 13H8m8 4H8m2-8H8m6-7H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.28 4 5.12 4 6.8v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 22 7.12 22 8.8 22h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 19.72 20 18.88 20 17.2V8l-6-6Z',
  alertCircle: 'M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z',
  xClose: 'M18 6L6 18M6 6l12 12',
} as const

export type ComponentToolIconName = keyof typeof UNTITLED_UI_PATHS

function iconPaths(name: ComponentToolIconName): { path?: string; paths?: string[] } {
  const value = UNTITLED_UI_PATHS[name]
  return Array.isArray(value) ? { paths: value } : { path: value }
}

export function ComponentToolIcon({
  name,
  size = 32,
  className,
}: {
  name: ComponentToolIconName
  size?: number
  className?: string
}) {
  return <UntitledUiLineIcon {...iconPaths(name)} size={size} className={className} />
}
