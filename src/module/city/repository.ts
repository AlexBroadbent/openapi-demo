import { QueryLimit, QuerySkip } from "../../types/parameters"
import { GetAllCities } from "../../types/responses"
import type { City } from "../../types/schemas"

type GetCitiesProps = { limit: QueryLimit; skip: QuerySkip }
const store: City[] = [
  { id: "barcelona", name: "Barcelona", country: "España" },
  { id: "geneva", name: "Geneva", country: "Schwiiz" },
  { id: "london", name: "London", country: "United Kingdom" },
  { id: "milan", name: "Milan", country: "Italia" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "thurles", name: "Thurles", country: "Éire" },
]

export const getCity = async (id: City["id"]): Promise<City | null> => {
  const result = store.find((city) => city.id === id)
  return result ?? null
}

export const createCity = async (city: City): Promise<City> => {
  store.push(city)
  return city
}

export const getCities = async (props: GetCitiesProps): Promise<GetAllCities> => {
  const { limit = 3, skip = 0 } = props

  const cities = store.sort((a, b) => (a.id > b.id ? 1 : 0))
  const data = cities.slice(skip, skip + limit)

  return { data, next: data.length ? `skip=${skip + data.length}` : null }
}
