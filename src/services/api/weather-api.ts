import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface ICoordsProps {
	latitude: number
	longitude: number
}

export const weatherApi = createApi({
	reducerPath: "weatherApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.open-meteo.com/v1/forecast" }),
	endpoints: (builder) => ({
		getForecast: builder.query({
			query: (geolocation: ICoordsProps) =>
				`?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&current=temperature_2m,is_day,weather_code&hourly=temperature_2m,weather_code,is_day&forecast_hours=6&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`,
		}),
	}),
})

export const { useGetForecastQuery } = weatherApi
