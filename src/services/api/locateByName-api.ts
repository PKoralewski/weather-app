import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const locateByNameApi = createApi({
	reducerPath: "locateByNameApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://geocoding-api.open-meteo.com/v1/search" }),
	endpoints: (builder) => ({
		getLocationsByName: builder.query({
			query: (name: string) => `?name=${name}&count=5&language=en&format=json`,
		}),
	}),
})

export const { useGetLocationsByNameQuery } = locateByNameApi
