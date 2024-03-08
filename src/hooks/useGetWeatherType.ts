import { useEffect, useState } from "react"

import { WEATHER_CODES } from "../utils/weather-codes"

interface IForecastProps {
	weatherCode: number
	isDay?: number
}

export const useGetWeatherType = ({ weatherCode, isDay = 1 }: IForecastProps) => {
	const [weatherType, setWeatherType] = useState<string>()

	const checkIsShowNight = (typeFromWeatherCode: string) =>
		!isDay && (typeFromWeatherCode === "sunny" || typeFromWeatherCode === "clouds")

	useEffect(() => {
		const typeFromWeatherCode = WEATHER_CODES[weatherCode as keyof typeof WEATHER_CODES]

		if (isDay) {
			setWeatherType(typeFromWeatherCode)
			return
		}

		const showNight = checkIsShowNight(typeFromWeatherCode)
		const currentWeatherType = showNight ? "night" : typeFromWeatherCode

		setWeatherType(currentWeatherType)
	}, [weatherCode, isDay])

	return weatherType || "sunny"
}
