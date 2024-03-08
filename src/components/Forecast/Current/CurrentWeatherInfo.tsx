import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

import WeatherImage from "../../common/WeatherImage"
import { RootState } from "../../../services/state/store"
import { useGetDateTime } from "../../../hooks/useGetDateTime"
import NoData from "../../common/NoData"

interface CurrentWeatherInfoProps {
	isLoading: boolean
	weatherType: string
	temperature2m: number
	dateTime: string
}

const CurrentWeatherInfo = ({ isLoading, weatherType, temperature2m, dateTime }: CurrentWeatherInfoProps) => {
	const region = useSelector((state: RootState) => state.location.locationRegion)
	const { date, hour, minutes } = useGetDateTime(dateTime)

	return (
		<Flex>
			<Flex
				position={"relative"}
				flexDirection={{ base: "column", sm: "row", xl: "column" }}
				justifyContent={{ base: "flex-start", sm: "space-evenly", xl: "flex-start" }}
				alignItems={{ base: "center", xl: "flex-start" }}
				borderRadius={"16px"}
				bgColor={"blackAlpha.700"}
				border='1px solid'
				borderColor={"gray.400"}
				color='white'
				minW={{ base: "100%", xl: "320px" }}
				maxW='400px'
				minH={["107px", "64px", "72px", "78px", "180.5px"]}
				px={5}
				py={{ base: 1, xl: 3 }}
				_before={{
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					w: "100%",
					h: "100%",
					borderRadius: "16px",
					backdropFilter: "blur(2px)",
					zIndex: 0,
				}}
			>
				{isLoading ? (
					<Spinner
						boxSize={["35px", "37px", "40px", "42px", "50px"]}
						mx='auto'
						my='auto'
						thickness='1px'
						speed='0.65s'
						emptyColor='gray.200'
						color='gray.700'
					/>
				) : region ? (
					<>
						<Flex alignItems='center' justifyContent={"space-between"} gap={[2, 3, 4, 8]} zIndex={1}>
							<Flex gap={1}>
								<Text fontSize={[24, 26, 32, 40, 50]} fontWeight={500}>
									{temperature2m}
								</Text>
								<Text fontSize={[20, 22, 28, 30, 40]} fontWeight={500}>
									°C
								</Text>
							</Flex>

							<WeatherImage
								boxSize={["48px", "56px", "64px", "70px", "86px"]}
								weatherType={weatherType}
							/>
						</Flex>
						<Flex flexDirection={"column"} alignItems={{ base: "center", xl: "flex-start" }}>
							<Text
								textAlign={{ base: "center", xl: "start" }}
								wordBreak={"break-word"}
								fontSize={{ base: 20, md: 22, xl: 28 }}
								zIndex={1}
							>
								{region?.name} | {region?.country}
							</Text>
							<Flex fontSize={[14, 15, 17, 19]} gap={2} zIndex={1}>
								<Text>{date}</Text>
								<Text>|</Text>
								<Text>
									{hour}:{minutes}
								</Text>
							</Flex>
						</Flex>
					</>
				) : (
					<NoData />
				)}
			</Flex>
		</Flex>
	)
}

export default CurrentWeatherInfo
