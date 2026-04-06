'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const newPosition = Math.min(Math.max((x / rect.width) * 100, 5), 95)
    setPosition(newPosition)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative overflow-hidden rounded-xl select-none cursor-ew-resize',
        'aspect-video',
        isDragging ? 'cursor-grabbing' : 'cursor-ew-resize',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full width) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-brand-green text-black text-xs font-bold px-2 py-1 rounded">
          AFTER
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative w-full h-full" style={{ minWidth: `${10000 / position}%` }}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
        <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
          BEFORE
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown as unknown as React.TouchEventHandler}
      >
        <div className="w-1 h-full bg-brand-green opacity-80" />
        <div className="absolute w-10 h-10 rounded-full bg-brand-green border-4 border-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
