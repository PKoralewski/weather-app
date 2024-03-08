import { Divider, Flex, Spinner, Text } from "@chakra-ui/react"
import React from "react"

import DailyForecast from "./DailyForecast"
import NoData from "../../common/NoData"

interface IDailyForecastProps {
	precipitation_probability_max: number[]
	temperature_2m_max: number[]
	temperature_2m_min: number[]
	time: string[]
	weather_code: number[]
}

interface IDailyForecastPanelProps {
	isLoading: boolean
	dailyForecast: IDailyForecastProps
}

const DailyForecastPanel = ({ isLoading, dailyForecast }: IDailyForecastPanelProps) => {
	return (
		<Flex w='100%' h='fit-content' justifyContent={{ base: "flex-start", xl: "flex-end" }}>
			<Flex
				flexDirection={"column"}
				position={"relative"}
				color='white'
				borderRadius={"16px"}
				minW={{ base: "100%", xl: "402.09px" }}
				minH={["743px", "576.5px", "578px", "635.5px", "542.5px"]}
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
							7-Day Forecast
						</Text>
						<Divider borderColor='gray.100' />
						{dailyForecast ? (
							<Flex flexDirection={"column"} gap={{ base: 2, xl: 0 }}>
								{dailyForecast?.weather_code?.map((item, index) => (
									<React.Fragment key={index}>
										{!!index && <Divider borderColor='gray.500' />}
										<DailyForecast
											key={index}
											isCurrentDay={!index}
											precipitationProbabilityMax={
												dailyForecast.precipitation_probability_max[index]
											}
											temperature2mMax={dailyForecast.temperature_2m_max[index]}
											temperature2mMin={dailyForecast.temperature_2m_min[index]}
											date={dailyForecast.time[index]}
											weatherCode={item}
										/>
									</React.Fragment>
								))}
							</Flex>
						) : (
							<NoData />
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	)
}

export default DailyForecastPanel
