import { render } from '@testing-library/react'

import Location from '@/app/[location]/page'
import { hourInMilliseconds } from '@/constants/timeMarks'

const unixTimestamp = 1718908012
const secondInMilliseconds = 1_000

jest.useFakeTimers()
jest.setSystemTime(
  new Date(unixTimestamp * 1_000 + hourInMilliseconds - secondInMilliseconds)
)

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      refresh: jest.fn()
    }
  }
}))

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
    dt: unixTimestamp,
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

describe('Location', () => {
  afterAll(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('should match snapshot', async () => {
    const encodedParams = encodeURIComponent('-22.2,-48.5,metric')

    const Resolved = await Location({
      params: { location: encodedParams }
    })

    const { container } = render(Resolved)

    expect(container).toMatchSnapshot()
  })

  it('should throw if params are wrong', async () => {
    const encodedParams = encodeURIComponent('NAN,NAN,notValid')

    await expect(
      async () => await Location({ params: { location: encodedParams } })
    ).rejects.toThrow()
  })
})
