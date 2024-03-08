import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface ICoordsProps {
	latitude: number
	longitude: number
}

export const locateByCoordsApi = createApi({
	reducerPath: "locateByCoordsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.bigdatacloud.net/data/reverse-geocode-client" }),
	endpoints: (builder) => ({
		getLocationByCoords: builder.query({
			query: (coords: ICoordsProps) =>
				`?latitude=${coords?.latitude}&longitude=${coords?.longitude}}&localityLanguage=en`,
		}),
	}),
})

export const { useGetLocationByCoordsQuery } = locateByCoordsApi
