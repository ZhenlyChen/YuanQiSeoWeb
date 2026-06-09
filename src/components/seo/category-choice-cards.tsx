import type { CategoryChoiceCard } from '@/types/seo-intelligence'

function StepIndicator() {
  return (
    <span className="seo-cat-progress__indicator seo-cat-progress__indicator--complete" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function CategoryChoiceCards({
  title,
  intro,
  cards,
}: {
  title: string
  intro: string
  cards: CategoryChoiceCard[]
}) {
  return (
    <section className="seo-page-section seo-page-section-anchor seo-cat-progress seo-cat-progress--static">
      <h2 className="seo-card__title">{title}</h2>
      <p className="seo-section__lead">{intro}</p>

      <ol className="seo-cat-progress__list">
        {cards.map((card, index) => (
          <li key={card.title} className="seo-cat-progress__step seo-cat-progress__step--complete">
            <div className="seo-cat-progress__rail" aria-hidden="true">
              <StepIndicator />
              {index < cards.length - 1 ? <span className="seo-cat-progress__line" /> : null}
            </div>

            <div className="seo-cat-progress__content">
              <h3 className="seo-cat-progress__step-title">{card.title}</h3>
              <div className="seo-cat-progress__panel seo-cat-progress__panel--open">
                <p className="seo-cat-progress__step-detail">{card.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
