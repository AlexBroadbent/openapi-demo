import { PathCityID } from "../../types/parameters"
import { City, CityCreate } from "../../types/schemas"
import { slugify } from "../../util/slugify"
import * as repo from "./repository"

export const getAllCities = async (): Promise<City[]> => repo.getCities()

export const getCity = async (id: PathCityID): Promise<City | null> => repo.getCity(id)

export const createCity = async (city: CityCreate): Promise<City> => {
  const newCity = { id: slugify(city.name), ...city }
  return repo.createCity(newCity)
}
