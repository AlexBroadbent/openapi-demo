import { City } from "../../types/schemas"

const store: City[] = [
  { id: "london", name: "London", country: "United Kingdom" },
  { id: "thurles", name: "Thurles", country: "Republic of Ireland" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "milan", name: "Milan", country: "Italy" },
  { id: "geneva", name: "Geneva", country: "Switzerland" },
]

export const getCity = async (id: City["id"]): Promise<City | null> => {
  const result = store.find((city) => city.id === id)
  return result ? result : null
}
