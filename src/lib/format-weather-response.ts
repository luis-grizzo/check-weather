import type {
  FetchWeatherResponse,
  FormattedFetchWeatherResponse,
  WeatherTypes
} from '@/types/weather'

export function formatWeatherResponse(
  response: FetchWeatherResponse
): FormattedFetchWeatherResponse {
  return {
    type: response.weather[0].main.toLowerCase() as WeatherTypes,
    description: response.weather[0].description,
    time: response.dt,
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    curr_temp: response.main.temp,
    feels_like_temp: response.main.feels_like,
    curr_min_temp: response.main.temp_min,
    curr_max_temp: response.main.temp_max,
    visibility: response.visibility,
    wind_speed: response.wind.speed,
    humidity: response.main.humidity,
    rain_1h: response.rain?.['1h'],
    snow_1h: response.snow?.['1h'],
    location: {
      country: response.sys.country,
      city: response.name
    }
  }
}
