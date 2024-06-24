import { formatWeatherResponse } from '@/utils/weatherUtils'

import type { FetchWeatherResponse } from '@/services/fetchWeather'
import type { FetchWeatherFactoredResponse } from '@/utils/weatherUtils'

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
      name: 'Jaú'
    }

    const formattedResponse: FetchWeatherFactoredResponse = {
      type: 'clear',
      description: 'clear sky',
      curr_temp: 28.54,
      feels_like_temp: 27.08,
      curr_min_temp: 28.54,
      curr_max_temp: 29.27,
      time: 1718729676,
      sunrise: 1718704356,
      sunset: 1718743121,
      visibility: 10000,
      wind_speed: 3.45,
      humidity: 18,
      location: {
        city: 'Jaú',
        country: 'BR'
      }
    }

    expect(formatWeatherResponse(apiResponse)).toEqual(formattedResponse)
  })
})
