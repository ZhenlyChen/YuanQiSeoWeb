import Link from 'next/link'

import { Stars02Icon } from '@/components/seo/stars-02-icon'
import { formatFileSize } from '@/lib/format-file-size'

function PdfFileTypeIcon() {
  return (
    <span className="seo-datasheet-file__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 33 40" fill="none">
        <path
          d="M4.5 0.75H20.5C20.6212 0.75 20.7375 0.798088 20.8232 0.883789L31.6162 11.6768C31.7019 11.7625 31.75 11.8788 31.75 12V36C31.75 37.7949 30.2949 39.25 28.5 39.25H4.5C2.70507 39.25 1.25 37.7949 1.25 36V4C1.25 2.20507 2.70508 0.75 4.5 0.75Z"
          stroke="#D0D5DD"
          strokeWidth="1.5"
        />
        <path d="M20.5 0.5V8C20.5 10.2091 22.2909 12 24.5 12H32" stroke="#D0D5DD" strokeWidth="1.5" />
      </svg>
      <span className="seo-datasheet-file__icon-badge">PDF</span>
    </span>
  )
}

function datasheetFileName(mpn: string, datasheetUrls?: string[]): string {
  const url = datasheetUrls?.[0]
  if (url) {
    try {
      const segment = new URL(url).pathname.split('/').pop()
      if (segment) return decodeURIComponent(segment)
    } catch {
      const segment = url.split('/').pop()
      if (segment) return decodeURIComponent(segment)
    }
  }
  return `${mpn}.pdf`
}

export function DatasheetFileCard({
  mpn,
  datasheetUrls,
  datasheetSizeBytes = 819_200,
  aiHref,
  aiLabel = 'Datasheet AI',
}: {
  mpn: string
  datasheetUrls?: string[]
  datasheetSizeBytes?: number
  aiHref: string
  aiLabel?: string
}) {
  const fileName = datasheetFileName(mpn, datasheetUrls)
  const fileUrl = datasheetUrls?.[0]
  const sizeLabel = formatFileSize(datasheetSizeBytes)

  return (
    <div className="seo-datasheet-file">
      <div className="seo-datasheet-file__main">
        <PdfFileTypeIcon />
        <div className="seo-datasheet-file__meta">
          {fileUrl ? (
            <a
              href={fileUrl}
              className="seo-datasheet-file__name"
              target="_blank"
              rel="noopener noreferrer"
            >
              {fileName}
            </a>
          ) : (
            <p className="seo-datasheet-file__name">{fileName}</p>
          )}
          <p className="seo-datasheet-file__size">{sizeLabel}</p>
        </div>
      </div>
      <Link href={aiHref} className="seo-datasheet-file__ai-btn">
        <Stars02Icon className="seo-datasheet-file__ai-icon" />
        <span>{aiLabel}</span>
      </Link>
    </div>
  )
}
