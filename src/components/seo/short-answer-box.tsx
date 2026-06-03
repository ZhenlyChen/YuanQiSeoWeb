import { UICard } from '@/components/ui/ui-card'

export function ShortAnswerBox({ text }: { text: string }) {
  return (
    <UICard className="seo-card seo-card--accent seo-direct-answer--gradient" tone="subtle">
      <p className="seo-short-answer__label" id="short-answer-heading">
        Short answer
      </p>
      <p>{text}</p>
    </UICard>
  )
}
