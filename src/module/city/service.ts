import { QueryLimit, QuerySkip } from "../../types/parameters"
import { GetAllCities } from "../../types/responses"
import { City, CityCreate } from "../../types/schemas"
import { slugify } from "../../util/slugify"
import { sendWebhook } from "../webhook/service"
import * as repo from "./repository"

export const getCity = async (id: City["id"]): Promise<City | null> => repo.getCity(id)

export const createCity = async (city: CityCreate): Promise<City> => {
  const newCity = { id: slugify(city.name), ...city }
  const result = await repo.createCity(newCity)
  await sendWebhook(newCity)
  return result
}

export const getAllCities = async (limit: QueryLimit, skip: QuerySkip): Promise<GetAllCities> =>
  repo.getCities({ limit, skip })
