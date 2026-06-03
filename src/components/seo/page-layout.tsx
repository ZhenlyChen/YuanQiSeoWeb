export function PageLayout({
  main,
  sidebar,
}: {
  main: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="seo-layout">
      <div className="seo-layout__main">{main}</div>
      <aside className="seo-layout__sidebar" aria-label="Supplementary">
        {sidebar}
      </aside>
    </div>
  )
}

export function PageLayoutSingle({ children }: { children: React.ReactNode }) {
  return <div className="seo-layout seo-layout--single">{children}</div>
}
