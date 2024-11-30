import { fetchWeather } from '@/services/fetchWeather'
import type { FormattedFetchWeatherResponse } from '@/types/weather'

describe('fetchWeather', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the formatted object response', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: jest.fn().mockImplementation(() => ({
        coord: {
          lon: -48.6,
          lat: -22.3
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        base: 'stations',
        main: {
          temp: 30.21,
          feels_like: 28.33,
          temp_min: 30.21,
          temp_max: 30.27,
          pressure: 1015,
          humidity: 17,
          sea_level: 1015,
          grnd_level: 952
        },
        visibility: 10000,
        wind: {
          speed: 0.83,
          deg: 43,
          gust: 1.91
        },
        clouds: {
          all: 0
        },
        dt: 1718908012,
        sys: {
          type: 2,
          id: 53165,
          country: 'BR',
          sunrise: 1718877183,
          sunset: 1718915943
        },
        timezone: -10800,
        id: 3460005,
        name: 'Jaú',
        cod: 200
      }))
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
      sunrise: 1718877183,
      sunset: 1718915943,
      time: 1718908012,
      type: 'clear',
      visibility: 10000,
      wind_speed: 0.83
    }

    const response = await fetchWeather({
      latitude: '-48.6',
      longitude: '-22.3'
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
          longitude: '-22.3'
        })
    ).rejects.toThrow()
  })
})
