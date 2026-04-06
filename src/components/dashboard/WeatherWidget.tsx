import { Cloud, Wind, Droplets, Thermometer, Sun, CloudRain, CloudSnow } from 'lucide-react'

interface WeatherWidgetProps {
  city?: string
  temp?: number
  description?: string
  humidity?: number
  windSpeed?: number
  isLoading?: boolean
}

function WeatherIcon({ description }: { description: string }) {
  const lower = description.toLowerCase()
  if (lower.includes('snow') || lower.includes('blizzard')) {
    return <CloudSnow className="w-12 h-12 text-blue-300" />
  }
  if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) {
    return <CloudRain className="w-12 h-12 text-blue-400" />
  }
  if (lower.includes('cloud') || lower.includes('overcast')) {
    return <Cloud className="w-12 h-12 text-gray-300" />
  }
  return <Sun className="w-12 h-12 text-yellow-400" />
}

function FieldConditions({ temp, description }: { temp: number; description: string }) {
  const lower = description.toLowerCase()
  const isSnow = lower.includes('snow')
  const isRain = lower.includes('rain')
  const isCold = temp < 32
  const isHot = temp > 90

  if (isSnow || isCold) {
    return (
      <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-3 mt-3">
        <p className="text-blue-300 text-xs font-bold uppercase tracking-wide mb-1">
          Field Conditions
        </p>
        <p className="text-blue-200 text-sm">
          {isSnow ? '❄️ Snow on ground — Snow removal routes active' : '🥶 Near freezing — Equipment warm-up required'}
        </p>
      </div>
    )
  }
  if (isRain) {
    return (
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-3 mt-3">
        <p className="text-yellow-300 text-xs font-bold uppercase tracking-wide mb-1">
          Field Conditions
        </p>
        <p className="text-yellow-200 text-sm">
          🌧️ Rain detected — Consider rescheduling lawn mowing
        </p>
      </div>
    )
  }
  if (isHot) {
    return (
      <div className="bg-orange-900/30 border border-orange-800 rounded-lg p-3 mt-3">
        <p className="text-orange-300 text-xs font-bold uppercase tracking-wide mb-1">
          Field Conditions
        </p>
        <p className="text-orange-200 text-sm">
          ☀️ Heat advisory — Ensure crew hydration & breaks
        </p>
      </div>
    )
  }
  return (
    <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 mt-3">
      <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">
        Field Conditions
      </p>
      <p className="text-green-200 text-sm">✅ Good conditions — All services a go</p>
    </div>
  )
}

export function WeatherWidget({
  city = 'Columbus, OH',
  temp = 62,
  description = 'Partly Cloudy',
  humidity = 55,
  windSpeed = 8,
  isLoading = false,
}: WeatherWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-xl p-5 animate-pulse">
        <div className="h-4 bg-dark-muted rounded w-24 mb-4" />
        <div className="h-12 bg-dark-muted rounded w-20 mb-2" />
        <div className="h-3 bg-dark-muted rounded w-32" />
      </div>
    )
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-condensed text-sm font-bold uppercase tracking-wide text-brand-green">
          Today&apos;s Weather
        </h3>
        <span className="text-xs text-gray-500">{city}</span>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <WeatherIcon description={description} />
        <div>
          <div className="flex items-start">
            <span className="font-condensed text-5xl font-black text-white leading-none">
              {temp}
            </span>
            <span className="font-condensed text-2xl font-bold text-gray-400 mt-1">°F</span>
          </div>
          <p className="text-gray-400 text-sm mt-0.5 capitalize">{description}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-dark-border">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-white">{humidity}%</span> Humidity
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-white">{windSpeed}</span> mph Wind
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-gray-300">
            Feels <span className="font-semibold text-white">{temp - 3}°</span>
          </span>
        </div>
      </div>

      <FieldConditions temp={temp} description={description} />
    </div>
  )
}
