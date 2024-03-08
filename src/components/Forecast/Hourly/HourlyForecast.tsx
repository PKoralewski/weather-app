import { Flex, Text } from "@chakra-ui/react"

import { useGetWeatherType } from "../../../hooks/useGetWeatherType"
import WeatherImage from "../../common/WeatherImage"
import { useGetDateTime } from "../../../hooks/useGetDateTime"

interface IHourlyForecastProps {
	isCurrentHour: boolean
	isDay: number
	temperature: number
	dateTime: string
	weatherCode: number
}

const HourlyForecast = ({ isCurrentHour, isDay, temperature, dateTime, weatherCode }: IHourlyForecastProps) => {
	const weatherType = useGetWeatherType({ weatherCode, isDay })
	const { hour } = useGetDateTime(dateTime)

	return (
		<Flex
			w='100%'
			flexDirection={{ base: "row", xl: "column" }}
			justifyContent={{ base: "space-between", xl: "flex-start" }}
			gap={{ base: 0, md: 7, xl: 0 }}
			alignItems={"center"}
		>
			<Text fontWeight={400} fontSize={[16, 17, 18, 19, 21]}>
				{isCurrentHour ? "Now" : hour}
			</Text>
			<WeatherImage weatherType={weatherType} boxSize={{ base: 12, sm: 14, lg: 16 }} />
			<Flex gap={1} ms={3} justifyContent={"center"}>
				<Text fontSize={[16, 17, 20, 21, 23]} fontWeight={500}>
					{Math.round(temperature)}
				</Text>
				<Text fontSize={[12, 13, 14, 15, 17]} fontWeight={500}>
					°C
				</Text>
			</Flex>
		</Flex>
	)
}

export default HourlyForecast
