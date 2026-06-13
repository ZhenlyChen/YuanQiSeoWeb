import { SeoUnavailableScreen } from '@/components/seo/seo-unavailable-screen'
import { consumeSeoUnavailableContext } from '@/lib/seo-not-found'

export default function CategoryHubNotFound() {
  const context = consumeSeoUnavailableContext()
  return <SeoUnavailableScreen context={context} />
}
