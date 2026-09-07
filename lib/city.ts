import { City } from '@prisma/client'

// City options for dropdowns, as [enum value, display label] pairs.
// "NorthVancouver" -> "North Vancouver": every Metro Vancouver municipality
// splits cleanly on the camelCase boundary, so labels are derived rather than
// hand-maintained — adding a value to the enum surfaces it here on its own.
export const CITY_OPTIONS = Object.values(City).map(
  city => [city, city.replace(/([a-z])([A-Z])/g, '$1 $2')] as [City, string]
)
