import { Flex, Progress, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { useGetWeatherType } from "../../../hooks/useGetWeatherType"
import WeatherImage from "../../common/WeatherImage"
import { DAYS_OF_THE_WEEK } from "../../../utils/days-of-the-week"

interface IDailyForecastProps {
	isCurrentDay: boolean
	precipitationProbabilityMax: number
	temperature2mMax: number
	temperature2mMin: number
	date: string
	weatherCode: number
}

const DailyForecast = ({
	isCurrentDay,
	precipitationProbabilityMax,
	temperature2mMax,
	temperature2mMin,
	date,
	weatherCode,
}: IDailyForecastProps) => {
	const weatherType = useGetWeatherType({ weatherCode })
	const [dayOfTheWeek, setDayOfTheWeek] = useState<string>()

	useEffect(() => {
		const day = getDayOfTheWeek()
		setDayOfTheWeek(day)
	}, [date])

	/* The `getDayIndex` function in the `DailyForecast` component is calculating the day index
	(0-6) of the week based on the date provided. It uses the `new Date(date).getDay()` method to
	get the day index from the date string passed to it. */
	const getDayIndex = () => new Date(date).getDay()

	/**
	 * This function returns the day of the week based on the current day index.
	 * @returns The function `getDayOfTheWeek` is returning the day of the week based on the current day
	 * index obtained from the `getDayIndex` function.
	 */
	const getDayOfTheWeek = () => {
		const dayIndex = getDayIndex()
		return DAYS_OF_THE_WEEK[dayIndex]
	}

	return (
		<Flex gap={{ base: 2, xl: 5 }} flexWrap={{ base: "wrap", sm: "nowrap" }}>
			<Flex
				w={{ base: "100%", sm: "auto" }}
				gap={{ base: 0, sm: 5 }}
				justifyContent={{ base: "space-between" }}
				alignItems={"center"}
			>
				<Text fontWeight={400} fontSize={[16, 17, 18, 19, 21]}>
					{isCurrentDay ? "Today" : dayOfTheWeek}
				</Text>
				<WeatherImage weatherType={weatherType} boxSize={{ base: 12, sm: 14, lg: 16 }} />
			</Flex>
			<Flex w='100%' gap={2} justifyContent={"space-between"} alignItems={"center"}>
				<Flex gap={1} justifyContent={"center"}>
					<Text fontSize={[16, 17, 20, 21, 23]} fontWeight={500}>
						{Math.round(temperature2mMin)}
					</Text>
					<Text fontSize={[12, 13, 14, 15, 17]} fontWeight={500}>
						°C
					</Text>
				</Flex>
				<Progress
					w={{ base: "100%", xl: "120px" }}
					colorScheme='cyan'
					borderRadius={16}
					h={{ base: "3px", xl: "4px" }}
					value={precipitationProbabilityMax}
				/>
				<Flex gap={1} justifyContent={"center"}>
					<Text fontSize={[16, 17, 20, 21, 23]} fontWeight={500}>
						{Math.round(temperature2mMax)}
					</Text>
					<Text fontSize={[12, 13, 14, 15, 17]} fontWeight={500}>
						°C
					</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default DailyForecast
