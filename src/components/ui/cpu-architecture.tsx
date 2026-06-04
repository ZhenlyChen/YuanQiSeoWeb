import { cn } from '@/lib/cn'

export interface CpuArchitectureSvgProps {
  className?: string
  width?: string
  height?: string
  text?: string
  showCpuConnections?: boolean
  lineMarkerSize?: number
  animateText?: boolean
  animateLines?: boolean
  animateMarkers?: boolean
  idPrefix?: string
}

const PATHS = [
  'M 10 20 h 79.5 q 5 0 5 5 v 30',
  'M 180 10 h -69.7 q -5 0 -5 5 v 30',
  'M 130 20 v 21.8 q 0 5 -5 5 h -10',
  'M 170 80 v -21.8 q 0 -5 -5 -5 h -50',
  'M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20',
  'M 94.8 95 v -36',
  'M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14',
  'M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20',
] as const

const MOTION_DURATIONS = ['4s', '4.6s', '3.8s', '5s', '4.2s', '3.5s', '4.8s', '3.9s'] as const

export function CpuArchitecture({
  className,
  width = '100%',
  height = '100%',
  text = 'CPU',
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
  idPrefix = 'seo-cpu',
}: CpuArchitectureSvgProps) {
  const ids = {
    marker: `${idPrefix}-circle-marker`,
    mask: (n: number) => `${idPrefix}-mask-${n}`,
    blueGrad: `${idPrefix}-blue-grad`,
    yellowGrad: `${idPrefix}-yellow-grad`,
    pinkGrad: `${idPrefix}-pinkish-grad`,
    whiteGrad: `${idPrefix}-white-grad`,
    greenGrad: `${idPrefix}-green-grad`,
    orangeGrad: `${idPrefix}-orange-grad`,
    cyanGrad: `${idPrefix}-cyan-grad`,
    roseGrad: `${idPrefix}-rose-grad`,
    lightShadow: `${idPrefix}-light-shadow`,
    connectionGrad: `${idPrefix}-connection-gradient`,
    textGrad: `${idPrefix}-text-gradient`,
  }

  const gradients = [
    ids.blueGrad,
    ids.yellowGrad,
    ids.pinkGrad,
    ids.whiteGrad,
    ids.greenGrad,
    ids.orangeGrad,
    ids.cyanGrad,
    ids.roseGrad,
  ]

  const chipCenterY = 50
  const chipScale = 1.48
  const chipHeight = 17
  const chipY = chipCenterY - chipHeight / 2
  const chipWidth = Math.max(28, Math.min(50, text.length * 3.85 + 6))
  const chipX = 100 - chipWidth / 2
  const chipFontSize = text.length > 5 ? 6.2 : 8

  return (
    <svg
      className={cn('seo-cpu-architecture', className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength={100}
        markerStart={`url(#${ids.marker})`}
      >
        {PATHS.map((d) => (
          <path key={d} strokeDasharray="100 100" pathLength={100} d={d} />
        ))}
        {animateLines ? (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        ) : null}
      </g>

      {PATHS.map((path, index) => (
        <g key={`light-${index + 1}`} mask={`url(#${ids.mask(index + 1)})`}>
          <circle cx="0" cy="0" r="8" fill={`url(#${gradients[index]})`}>
            <animateMotion dur={MOTION_DURATIONS[index]} repeatCount="indefinite" path={path} />
          </circle>
        </g>
      ))}

      <g transform={`translate(100 ${chipCenterY}) scale(${chipScale}) translate(-100 -${chipCenterY})`}>
        {showCpuConnections ? (
          <g fill={`url(#${ids.connectionGrad})`}>
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="116.3" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="122.8" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="104" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="114.5" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="80" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
            <rect x="87" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
          </g>
        ) : null}
        <rect x={chipX} y={chipY} width={chipWidth} height={chipHeight} rx="2" fill="#181818" filter={`url(#${ids.lightShadow})`} />
        <text
          x="100"
          y={chipCenterY}
          fontSize={chipFontSize}
          fill={animateText ? `url(#${ids.textGrad})` : 'white'}
          fontWeight="600"
          letterSpacing="0.03em"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {text}
        </text>
      </g>

      <defs>
        {PATHS.map((d, index) => (
          <mask key={`mask-${index + 1}`} id={ids.mask(index + 1)}>
            <path d={d} strokeWidth="0.5" stroke="white" />
          </mask>
        ))}

        <radialGradient id={ids.blueGrad} fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.yellowGrad} fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.pinkGrad} fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.whiteGrad} fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.greenGrad} fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.orangeGrad} fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.cyanGrad} fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={ids.roseGrad} fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <filter id={ids.lightShadow} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="black" floodOpacity="0.1" />
        </filter>

        <marker
          id={ids.marker}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle cx="5" cy="5" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
            {animateMarkers ? <animate attributeName="r" values="0; 3; 2" dur="0.5s" /> : null}
          </circle>
        </marker>

        <linearGradient id={ids.connectionGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>

        <linearGradient id={ids.textGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
