'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ComponentChipThumb } from '@/components/discover/ComponentChipThumb'
import { ManufacturerLogoAvatar } from '@/components/seo/manufacturer-logo-avatar'
import { resolveManufacturerLogo } from '@/lib/manufacturer-logos'
import type { PublicDiscoverTrending } from '@/lib/discover-api'
import { signUpUrl } from '@/lib/tool-urls'

function formatChange(value?: number) {
  if (value == null || Number.isNaN(value)) return null
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(0)}%`
}

type TrendingEntry = PublicDiscoverTrending['groups'][number]['items'][number]

function trendingEntryKey(item: TrendingEntry, groupKey: string, index: number): string {
  const id = item.entityKey || item.mpn || item.manufacturerId || item.label
  return `${groupKey}:${id}:${index}`
}

function monogramFor(label: string): string {
  return label.trim().charAt(0).toUpperCase() || 'M'
}

function TrendingRow({ item, isManufacturer }: { item: TrendingEntry; isManufacturer?: boolean }) {
  const change = formatChange(item.changePercent)
  const logo = resolveManufacturerLogo('', item.logoUrl)

  return (
    <Link
      href={signUpUrl(`trending-${item.label}`)}
      className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#F9FAFB]"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {isManufacturer && (
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-solid border-[#E4E7EC] bg-[#F9FAFB]"
            aria-hidden="true"
          >
            <ManufacturerLogoAvatar
              logo={logo}
              monogram={monogramFor(item.label)}
              imgClassName="h-[72%] w-[72%] object-contain"
              monogramClassName="text-xs font-semibold text-[#667085]"
            />
          </span>
        )}
        {!isManufacturer && <ComponentChipThumb imageUrl={item.imageUrl} mpn={item.mpn || item.label} />}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-[#101828]">{item.label}</div>
          {item.subLabel && <div className="truncate text-xs text-[#667085]">{item.subLabel}</div>}
        </div>
      </div>
      {change && <span className="shrink-0 text-xs font-semibold text-[#067647]">{change}</span>}
    </Link>
  )
}

export function DiscoverTrendingSidebar({
  trending,
  className,
}: {
  trending: PublicDiscoverTrending
  className?: string
}) {
  return (
    <aside className={clsx('space-y-4', className)}>
      {trending.groups.map((group) => (
        <section key={group.key} className="space-y-2">
          <h3 className="text-base font-medium text-[#101828] [font-family:var(--seo-heading-font)]">
            {group.title}
          </h3>
          <div className="rounded-xl border border-[#E4E7EC] bg-white p-3">
            {group.items.map((item, index) => (
              <TrendingRow
                key={trendingEntryKey(item, group.key, index)}
                item={item}
                isManufacturer={group.key === 'hot_manufacturers'}
              />
            ))}
          </div>
        </section>
      ))}
    </aside>
  )
}

export function DiscoverTrendingMobileStrip({ trending }: { trending: PublicDiscoverTrending }) {
  const entries = trending.groups.flatMap((group) =>
    group.items.map((item, index) => ({ groupKey: group.key, item, index })),
  ).slice(0, 8)

  return (
    <div className="pg-hide-scrollbar flex gap-2 overflow-x-auto pb-2 lg:hidden">
      {entries.map(({ groupKey, item, index }) => (
        <Link
          key={trendingEntryKey(item, groupKey, index)}
          href={signUpUrl(`trending-${item.label}`)}
          className="shrink-0 rounded-full border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-semibold text-[#344054]"
        >
          {item.label}
          {item.changePercent != null && (
            <span className="ml-1 text-[#067647]">{formatChange(item.changePercent)}</span>
          )}
        </Link>
      ))}
    </div>
  )
}
