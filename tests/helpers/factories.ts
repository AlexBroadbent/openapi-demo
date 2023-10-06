import { faker } from "@faker-js/faker"

import { City, CityCreate, Route } from "../../src/types/schemas"
import { slugify } from "../../src/util/slugify"

export const buildCity = (overrides: Partial<City> = {}): City => {
  const name = faker.location.city()

  return {
    id: slugify(name),
    name,
    country: faker.location.country(),

    ...overrides,
  }
}

export const buildCityCreate = (overrides: Partial<CityCreate> = {}): CityCreate => {
  return {
    name: faker.location.city(),
    country: faker.location.country(),

    ...overrides,
  }
}

export const buildRoute = (overrides: Partial<Route> = {}): Route => ({
  from: slugify(faker.location.city()),
  to: slugify(faker.location.city()),
  miles: faker.number.int({ min: 100, max: 2_000 }),

  ...overrides,
})
