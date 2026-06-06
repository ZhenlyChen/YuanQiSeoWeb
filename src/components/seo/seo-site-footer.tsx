'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { SeoLocaleSwitcher } from '@/components/seo/seo-locale-switcher'
import { SeoPrimaryCtaButton } from '@/components/seo/seo-primary-cta'
import type { AppLocale } from '@/i18n/routing'
import {
  buildFooterColumns,
  FOOTER_LEGAL,
  FOOTER_LOGO_SRC,
  FOOTER_SOCIAL,
  getFooterLabelsFromTranslations,
} from '@/lib/footer-links'
import { subscribeNewsletter } from '@/lib/newsletter-api'
import { MARKETING_ORIGIN } from '@/lib/tool-urls'

function DiscordIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1a14.66 14.66 0 0 0-4.58 0a10.14 10.14 0 0 0-.53-1.1a16 16 0 0 0-4.13 1.3a17.33 17.33 0 0 0-3 11.59a16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83a3.39 3.39 0 0 0 .42-.33a11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84a12.41 12.41 0 0 0 1.08 1.78a16.44 16.44 0 0 0 5.06-2.59a17.22 17.22 0 0 0-3-11.59a16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2a1.93 1.93 0 0 1 1.8-2a1.93 1.93 0 0 1 1.8 2a1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2a1.93 1.93 0 0 1 1.8-2a1.92 1.92 0 0 1 1.8 2a1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.75971H9.7583V18.3216H12.4217V18.1219C12.4217 17.742 12.4214 17.362 12.4211 16.9819C12.4203 15.9674 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292C15.6567 17.3992 15.6561 17.769 15.6561 18.1388V18.3202H18.328V18.1149C18.328 17.6629 18.3278 17.211 18.3275 16.7591C18.327 15.6293 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C15.404 9.54401 15.3412 9.54062 15.2781 9.53721C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
        fill="currentColor"
      />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { href: FOOTER_SOCIAL.discord, label: 'Discord', icon: DiscordIcon },
  { href: FOOTER_SOCIAL.x, label: 'X', icon: XIcon },
  { href: FOOTER_SOCIAL.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
  { href: FOOTER_SOCIAL.youtube, label: 'YouTube', icon: YouTubeIcon },
] as const

export function SeoSiteFooter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const t = useTranslations('footer')
  const locale = useLocale() as AppLocale
  const footerColumns = buildFooterColumns(getFooterLabelsFromTranslations(t), locale)

  return (
    <footer className="seo-site-footer">
      <div className="seo-site-footer__inner">
        <div className="seo-site-footer__newsletter">
          <div className="seo-site-footer__newsletter-copy">
            <h3 className="seo-site-footer__newsletter-title">{t('newsletterTitle')}</h3>
          </div>
          <div className="seo-site-footer__newsletter-form-wrap">
            {!submitted ? (
              <>
                <form
                  className="seo-site-footer__newsletter-form"
                  onSubmit={async (event) => {
                    event.preventDefault()
                    if (!email.trim() || submitting) return
                    setSubmitting(true)
                    setError('')
                    try {
                      const result = await subscribeNewsletter(email, { locale })
                      setSuccessMessage(result.message || t('subscriptionSuccess'))
                      setSubmitted(true)
                    } catch (submitError) {
                      setError(
                        submitError instanceof Error
                          ? submitError.message
                          : t('subscriptionFailed'),
                      )
                    } finally {
                      setSubmitting(false)
                    }
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (error) setError('')
                    }}
                    className="seo-site-footer__newsletter-input"
                    autoComplete="email"
                    disabled={submitting}
                    aria-invalid={error ? true : undefined}
                  />
                  <SeoPrimaryCtaButton
                    type="submit"
                    className="seo-site-footer__newsletter-submit"
                    disabled={submitting}
                  >
                    {submitting ? t('subscribing') : t('subscribe')}
                  </SeoPrimaryCtaButton>
                </form>
                {error ? (
                  <p className="seo-site-footer__newsletter-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <p className="seo-site-footer__newsletter-disclaimer">
                  {t.rich('newsletterDisclaimer', {
                    privacyLink: (chunks) => (
                      <a key="privacy" href={FOOTER_LEGAL.privacy}>
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </>
            ) : (
              <p className="seo-site-footer__newsletter-success" role="status">
                {successMessage || t('subscriptionSuccess')}
              </p>
            )}
          </div>
        </div>

        <div className="seo-site-footer__columns">
          <div className="seo-site-footer__brand-col">
            <a href={MARKETING_ORIGIN} className="seo-site-footer__brand">
              <img
                src={FOOTER_LOGO_SRC}
                alt="PartGenie"
                className="seo-site-footer__brand-logo"
                width={182}
                height={32}
              />
            </a>
            <SeoLocaleSwitcher variant="footer" />
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="seo-site-footer__column">
              <p className="seo-site-footer__column-title">{column.title}</p>
              <ul className="seo-site-footer__column-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="seo-site-footer__divider" aria-hidden="true" />

        <div className="seo-site-footer__bottom">
          <p className="seo-site-footer__copyright">{t('copyright')}</p>
          <div className="seo-site-footer__social" aria-label={t('socialLinks')}>
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
          <div className="seo-site-footer__legal">
            <a href={FOOTER_LEGAL.privacy}>{t('privacyPolicy')}</a>
            <a href={FOOTER_LEGAL.terms}>{t('termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
