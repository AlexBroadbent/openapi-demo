import { QueryLimit, QuerySkip } from "../../types/parameters"
import type { City } from "../../types/schemas"

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

export type GetCitiesProps = { limit: QueryLimit; skip: QuerySkip }

export const getCities = async (props: GetCitiesProps): Promise<{ results: City[]; next?: City["id"] }> => {
  const { limit = 3, skip = 0 } = props

  const cities = store.sort((a, b) => (a.id > b.id ? 1 : 0))

  return { results: cities.slice(skip, skip + limit), next: `skip=${skip + limit}` }
}
