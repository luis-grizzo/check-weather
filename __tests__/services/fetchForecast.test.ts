import { fetchForecast } from '@/services/fetchForecast'
import type { FormattedFetchForecastResponse } from '@/types/forecast'

describe('fetchForecast', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the formatted object response', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: jest.fn().mockImplementation(() => ({
        cod: '200',
        message: 0,
        cnt: 40,
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
              humidity: 59,
              temp_kf: 0
            },
            weather: [
              {
                id: 803,
                main: 'Clouds',
                description: 'nublado',
                icon: '04d'
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
            dt_txt: '2024-10-31 21:00:00'
          }
        ],
        city: {
          id: 3460005,
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
      }))
    }))

    const mockResponse: FormattedFetchForecastResponse = {
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
          visibility: 10000
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

    const response = await fetchForecast({
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
        await fetchForecast({
          latitude: '-48.6',
          longitude: '-22.3'
        })
    ).rejects.toThrow()
  })
})
