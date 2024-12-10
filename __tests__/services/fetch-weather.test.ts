import { defaultLocale } from '@tests/constants'

import { fetchWeather } from '@/services/fetch-weather'

import type {
  FetchWeatherResponse,
  FormattedFetchWeatherResponse,
  WeatherTypes
} from '@/types/weather'

describe('fetchWeather', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the formatted object response', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: jest.fn().mockImplementation(
        (): FetchWeatherResponse => ({
          weather: [
            {
              main: 'Clear' as WeatherTypes,
              description: 'clear sky'
            }
          ],
          main: {
            temp: 30.21,
            feels_like: 28.33,
            temp_min: 30.21,
            temp_max: 30.27,
            humidity: 17
          },
          visibility: 10000,
          wind: {
            speed: 0.83
          },
          dt: 1718908012,
          sys: {
            country: 'BR',
            sunrise: 1718877183,
            sunset: 1718915943
          },
          rain: {
            '1h': 1
          },
          snow: {
            '1h': 2
          },
          name: 'Jaú'
        })
      )
    }))

    const mockResponse: FormattedFetchWeatherResponse = {
      curr_max_temp: 30.27,
      curr_min_temp: 30.21,
      curr_temp: 30.21,
      description: 'clear sky',
      feels_like_temp: 28.33,
      humidity: 17,
      location: {
        city: 'Jaú',
        country: 'BR'
      },
      rain_1h: 1,
      snow_1h: 2,
      sunrise: 1718877183000,
      sunset: 1718915943000,
      time: 1718908012000,
      type: 'clear',
      visibility: 10000,
      wind_speed: 0.83
    }

    const response = await fetchWeather({
      latitude: '-48.6',
      longitude: '-22.3',
      locale: defaultLocale
    })

    expect(response).toEqual(mockResponse)
  })

  it('should throw if request fail', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false
    }))

    await expect(
      async () =>
        await fetchWeather({
          latitude: '-48.6',
          longitude: '-22.3',
          locale: defaultLocale
        })
    ).rejects.toThrow()
  })
})
