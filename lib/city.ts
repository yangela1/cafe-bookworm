import { City } from '@prisma/client'

// "NorthVancouver" -> "North Vancouver". Every Metro Vancouver municipality
// splits cleanly on the camelCase boundary, so labels are derived rather than
// hand-maintained — adding a value to the enum surfaces it on its own.
export const cityLabel = (city: City) => city.replace(/([a-z])([A-Z])/g, '$1 $2')

// City options for dropdowns, as [enum value, display label] pairs.
export const CITY_OPTIONS = Object.values(City).map(
  city => [city, cityLabel(city)] as [City, string]
)
