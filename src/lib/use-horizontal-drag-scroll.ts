'use client'

import { useEffect, useRef } from 'react'

const DRAG_THRESHOLD_PX = 6

export function useHorizontalDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const dragRef = useRef({
    active: false,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const resetDragStyles = () => {
      el.style.cursor = ''
      el.style.userSelect = ''
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragRef.current = {
        active: true,
        dragging: false,
        startX: event.clientX,
        scrollLeft: el.scrollLeft,
        pointerId: event.pointerId,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active || event.pointerId !== dragRef.current.pointerId) return

      const deltaX = event.clientX - dragRef.current.startX
      if (!dragRef.current.dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return
        dragRef.current.dragging = true
        el.setPointerCapture(event.pointerId)
        el.style.cursor = 'grabbing'
        el.style.userSelect = 'none'
      }

      el.scrollLeft = dragRef.current.scrollLeft - deltaX
    }

    const onPointerUp = (event: PointerEvent) => {
      if (!dragRef.current.active || event.pointerId !== dragRef.current.pointerId) return

      const wasDragging = dragRef.current.dragging
      dragRef.current.active = false
      dragRef.current.dragging = false

      if (wasDragging) {
        if (el.hasPointerCapture(event.pointerId)) {
          el.releasePointerCapture(event.pointerId)
        }
        resetDragStyles()

        const suppressClick = (clickEvent: MouseEvent) => {
          clickEvent.preventDefault()
          clickEvent.stopPropagation()
          el.removeEventListener('click', suppressClick, true)
        }
        el.addEventListener('click', suppressClick, true)
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      resetDragStyles()
    }
  }, [])

  return ref
}
