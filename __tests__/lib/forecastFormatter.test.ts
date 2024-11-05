import { formatForecastResponse } from '@/lib/format-forecast-response'

import type {
  FetchForecastResponse,
  FormattedFetchForecastResponse
} from '@/types/forecast'
import { WeatherTypes } from '@/types/weather'

describe('formatWeatherResponse', () => {
  it('should return the correct formatted object', () => {
    const apiResponse: FetchForecastResponse = {
      list: [
        {
          dt: 1730408400,
          main: {
            temp: 25.27,
            feels_like: 25.39,
            temp_min: 25.27,
            temp_max: 25.27,
            pressure: 1008,
            sea_level: 1008,
            grnd_level: 945,
            humidity: 59
          },
          weather: [
            {
              main: 'Clouds' as WeatherTypes,
              description: 'nublado'
            }
          ],
          clouds: {
            all: 82
          },
          wind: {
            speed: 2.59,
            deg: 45,
            gust: 5.64
          },
          visibility: 10000,
          pop: 0.06,
          sys: {
            pod: 'd'
          },
          rain: {
            '3h': 1
          },
          snow: {
            '3h': 1
          }
        }
      ],
      city: {
        name: 'Jaú',
        coord: {
          lat: -22.3,
          lon: -48.6
        },
        country: 'BR',
        population: 119206,
        timezone: -10800,
        sunrise: 1729931604,
        sunset: 1729977779
      }
    }

    const formattedResponse: FormattedFetchForecastResponse = {
      forecasts: [
        {
          time: 1730408400,
          day_part: 'd',
          description: 'nublado',
          feels_like_temp: 25.39,
          max_temp: 25.27,
          min_temp: 25.27,
          precipitation_prob: 0.06,
          temp: 25.27,
          type: 'clouds',
          visibility: 10000,
          rain_last_3h: 1,
          snow_last_3h: 1
        }
      ],
      location: {
        city: 'Jaú',
        coord: {
          lat: -22.3,
          lon: -48.6
        },
        country: 'BR',
        population: 119206,
        sunrise: 1729931604,
        sunset: 1729977779,
        timezone: -10800
      }
    }

    expect(formatForecastResponse(apiResponse)).toEqual(formattedResponse)
  })
})
