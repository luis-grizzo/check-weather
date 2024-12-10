import { formatWeatherResponse } from '@/lib/format-weather-response'

import type {
  FetchWeatherResponse,
  FormattedFetchWeatherResponse
} from '@/types/weather'

describe('formatWeatherResponse', () => {
  it('should return the correct formatted object', () => {
    const apiResponse: FetchWeatherResponse = {
      weather: [
        {
          description: 'clear sky',
          main: 'clear'
        }
      ],
      main: {
        temp: 28.54,
        feels_like: 27.08,
        temp_min: 28.54,
        temp_max: 29.27,
        humidity: 18
      },
      visibility: 10000,
      wind: {
        speed: 3.45
      },
      dt: 1718729676,
      sys: {
        country: 'BR',
        sunrise: 1718704356,
        sunset: 1718743121
      },
      rain: {
        '1h': 1
      },
      snow: {
        '1h': 2
      },
      name: 'Jaú'
    }

    const formattedResponse: FormattedFetchWeatherResponse = {
      type: 'clear',
      description: 'clear sky',
      curr_temp: 28.54,
      feels_like_temp: 27.08,
      curr_min_temp: 28.54,
      curr_max_temp: 29.27,
      time: 1718729676000,
      sunrise: 1718704356000,
      sunset: 1718743121000,
      visibility: 10000,
      wind_speed: 3.45,
      humidity: 18,
      rain_1h: 1,
      snow_1h: 2,
      location: {
        city: 'Jaú',
        country: 'BR'
      }
    }

    expect(formatWeatherResponse(apiResponse)).toEqual(formattedResponse)
  })
})
