import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Box, Flex, useMediaQuery } from "@chakra-ui/react"
import { skipToken } from "@reduxjs/toolkit/query"

import LocationInput from "../components/Location/LocationInput"
import { useGetForecastQuery } from "../services/api/weather-api"
import { RootState } from "../services/state/store"
import { clearLocation, setLocation } from "../services/state/slices/location-slice"
import { WEATHER_GRADIENTS } from "../utils/weather-gradients"
import CurrentWeatherInfo from "../components/Forecast/Current/CurrentWeatherInfo"
import { useGetWeatherType } from "../hooks/useGetWeatherType"
import { useGetUserCoords } from "../hooks/useGetUserCoords"
import { useGetLocationByCoordsQuery } from "../services/api/locateByCoords-api"
import HourlyForecastPanel from "../components/Forecast/Hourly/HourlyForecastPanel"
import DailyForecastPanel from "../components/Forecast/Daily/DailyForecastPanel"
import FadePageAnimation from "../components/common/FadePageAnimation"

const WeatherPage = () => {
	const dispatch = useDispatch()
	const coords = useSelector((state: RootState) => state.location.coords)
	const region = useSelector((state: RootState) => state.location.locationRegion)

	const { coords: userCoords, error: userCoordsError, reload: reloadUserCoords } = useGetUserCoords()
	const { data: location, isFetching: isFetchingLocation } = useGetLocationByCoordsQuery(userCoords ?? skipToken)
	const { data: forecast, isLoading: isLoadingForecast } = useGetForecastQuery(coords ?? skipToken)
	const weatherType = useGetWeatherType({
		weatherCode: forecast?.current?.weather_code,
		isDay: forecast?.current?.is_day,
	})

	const [isLargerThan640] = useMediaQuery("(min-width: 640px)", {
		ssr: false,
	})

	useEffect(() => {
		if (isFetchingLocation || !location) return
		if (region?.name === location?.locality && region?.country === location?.countryName) return

		dispatch(
			setLocation({
				locationRegion: { name: location.locality, country: location.countryName },
				coords: { latitude: location.latitude, longitude: location.longitude },
			}),
		)
	}, [location, userCoords])

	useEffect(() => {
		return () => {
			dispatch(clearLocation())
		}
	}, [])

	return (
		<FadePageAnimation>
			<Box p={[4, 6, 8, 10, 12]} bgGradient={WEATHER_GRADIENTS[weatherType as keyof typeof WEATHER_GRADIENTS]}>
				<Flex
					minH={"calc(100vh - 6rem)"}
					h='auto'
					justifyContent={["flex-start", "space-between"]}
					flexWrap={{ base: "wrap", xl: "nowrap" }}
					bgImage={require(`../assets/images/weatherPage/${weatherType}_${isLargerThan640 ? 1920 : 640}.jpg`)}
					bgPosition={"center"}
					bgSize={"cover"}
					bgRepeat={"no-repeat"}
					borderRadius={4}
					p={{ base: 5, xl: 7 }}
					gap={5}
					transition={"background-image 0.5s ease-in-out"}
				>
					<Flex
						flexDirection={"column"}
						w='100%'
						gap={{ base: 10, sm: 14, md: 16 }}
						justifyContent={"space-between"}
					>
						<LocationInput error={userCoordsError} reloadUserCoords={reloadUserCoords} />
						<CurrentWeatherInfo
							isLoading={isLoadingForecast}
							weatherType={weatherType}
							temperature2m={forecast?.current?.temperature_2m}
							dateTime={forecast?.current?.time}
						/>
					</Flex>
					<Flex
						w={{ base: "100%", xl: "auto" }}
						flexDirection={{ base: "column", md: "row", xl: "column" }}
						justifyContent={{ base: "flex-start", md: "space-between", xl: "space-between" }}
						gap={5}
					>
						<HourlyForecastPanel isLoading={isLoadingForecast} hourlyForecast={forecast?.hourly} />
						<DailyForecastPanel isLoading={isLoadingForecast} dailyForecast={forecast?.daily} />
					</Flex>
				</Flex>
			</Box>
		</FadePageAnimation>
	)
}
export default WeatherPage
