import { partFinderUrl, rfqUrl } from '@/lib/tool-urls'
import { UIButton } from '@/components/ui/ui-button'

export function FloatingCtaDock() {
  return (
    <div className="seo-floating-cta" role="region" aria-label="Quick actions">
      <UIButton href={partFinderUrl('floating_ask')} variant="dark">
        Ask in PartGenie
      </UIButton>
      <UIButton href={rfqUrl('floating_sourcing_help')} variant="primary">
        Get sourcing help
      </UIButton>
    </div>
  )
}
