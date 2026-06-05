'use client'

import { cn } from '@/lib/cn'
import { useEffect, useRef, useState } from 'react'

type TypewriterTextProps = {
  text: string
  className?: string
  id?: string
  charDelayMs?: number
  startDelayMs?: number
}

export function TypewriterText({
  text,
  className,
  id,
  charDelayMs = 16,
  startDelayMs = 240,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [complete, setComplete] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setStarted(false)
    setComplete(false)
  }, [text])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    function applyPreference() {
      const prefersReducedMotion = media.matches
      setReducedMotion(prefersReducedMotion)
      if (prefersReducedMotion) {
        setDisplayed(text)
        setComplete(true)
        setStarted(true)
      }
    }

    applyPreference()
    media.addEventListener('change', applyPreference)
    return () => media.removeEventListener('change', applyPreference)
  }, [text])

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const node = containerRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, text])

  useEffect(() => {
    if (reducedMotion || !started || complete) {
      return
    }

    if (displayed.length >= text.length) {
      setComplete(true)
      return
    }

    const delay = displayed.length === 0 ? startDelayMs : charDelayMs
    const timer = window.setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [charDelayMs, complete, displayed, reducedMotion, startDelayMs, started, text])

  if (reducedMotion) {
    return (
      <p id={id} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={containerRef} id={id} className={cn('seo-typewriter', className)}>
      <span className="seo-sr-only">{text}</span>
      <span className="seo-typewriter__ghost" aria-hidden="true">
        {text}
      </span>
      <span className="seo-typewriter__content" aria-hidden="true">
        {displayed}
        {!complete ? <span className="seo-typewriter__cursor" /> : null}
      </span>
    </p>
  )
}
