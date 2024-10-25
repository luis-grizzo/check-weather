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
    curr_temp: response.main.temp,
    feels_like_temp: response.main.feels_like,
    curr_min_temp: response.main.temp_min,
    curr_max_temp: response.main.temp_max,
    time: response.dt,
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    visibility: response.visibility,
    wind_speed: response.wind.speed,
    humidity: response.main.humidity,
    location: {
      city: response.name,
      country: response.sys.country
    }
  }
}
