export type WeatherTypes =
  | 'clear'
  | 'clouds'
  | 'drizzle'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'smoke'
  | 'haze'
  | 'dust'
  | 'fog'
  | 'sand'
  | 'ash'
  | 'squall'
  | 'tornado'

export interface GenericWeatherInfo {
  description: string
  value: string
}
