import { Box, Divider, Flex, Spinner, Text, useMediaQuery } from "@chakra-ui/react"
import React from "react"

import HourlyForecast from "./HourlyForecast"
import NoData from "../../common/NoData"

interface IHourlyForecastProps {
	is_day: number[]
	temperature_2m: number[]
	time: string[]
	weather_code: number[]
}

interface IHourlyForecastPanelProps {
	isLoading: boolean
	hourlyForecast: IHourlyForecastProps
}

const HourlyForecastPanel = ({ isLoading, hourlyForecast }: IHourlyForecastPanelProps) => {
	const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")

	return (
		<Box>
			<Flex
				flexDirection={"column"}
				position={"relative"}
				color='white'
				borderRadius={"16px"}
				minW={{ base: "auto", md: "230.2px", lg: "241.81px", xl: "629px" }}
				h={["414px", "463.5px", "465px", "514.5px", "218.5px"]}
				bgColor={"blackAlpha.700"}
				border='1px solid'
				borderColor={"gray.400"}
				p={5}
				_before={{
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					w: "100%",
					h: "100%",
					borderRadius: "16px",
					backdropFilter: "blur(5px)",
					zIndex: 0,
				}}
			>
				{isLoading ? (
					<Spinner
						boxSize={["40px", "42px", "45px", "47px", "50px"]}
						mx='auto'
						my='auto'
						thickness='1px'
						speed='0.65s'
						emptyColor='gray.200'
						color='gray.700'
					/>
				) : (
					<Flex flexDirection={"column"} h='100%' gap={2} zIndex={1}>
						<Text ms={3} fontSize={[16, 17, 18, 19, 21]}>
							6-Hour Forecast
						</Text>
						<Divider borderColor='gray.100' />
						{hourlyForecast ? (
							<Flex
								gap={{ base: 1, xl: 5 }}
								flexDirection={{ base: "column", xl: "row" }}
								alignItems={"center"}
							>
								{hourlyForecast?.weather_code.map((item, index) => (
									<React.Fragment key={index}>
										{!!index && (
											<Divider
												orientation={isLargerThan1280 ? "vertical" : "horizontal"}
												height={{ base: "auto", xl: "120px" }}
												borderColor='gray.500'
											/>
										)}
										<HourlyForecast
											isCurrentHour={!index}
											isDay={hourlyForecast?.is_day[index]}
											dateTime={hourlyForecast?.time[index]}
											temperature={hourlyForecast?.temperature_2m[index]}
											weatherCode={item}
										/>
									</React.Fragment>
								))}
							</Flex>
						) : (
							<Flex h='100%' alignItems={"center"}>
								<NoData />
							</Flex>
						)}
					</Flex>
				)}
			</Flex>
		</Box>
	)
}

export default HourlyForecastPanel
