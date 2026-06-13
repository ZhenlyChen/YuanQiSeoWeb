import { SeoUnavailableScreen } from '@/components/seo/seo-unavailable-screen'
import { consumeSeoUnavailableContext } from '@/lib/seo-not-found'

export default function PartNotFound() {
  const context = consumeSeoUnavailableContext()
  return <SeoUnavailableScreen context={context} />
}
