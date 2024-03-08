import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { ChevronRightIcon, InfoIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

import { pulse } from "../utils/animations/pulse-animation"
import FadePageAnimation from "../components/common/FadePageAnimation"

const StartPage = () => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate("/weather")
	}

	return (
		<FadePageAnimation>
			<Box>
				<Flex
					position='absolute'
					bgImage={{
						base: require("../assets/images/startPage/start-page_640.jpg"),
						sm: require("../assets/images/startPage/start-page_1920.jpg"),
					}}
					bgRepeat='no-repeat'
					bgPosition='center'
					bgSize='cover'
					w='100%'
					minH='100%'
				>
					<Flex w='100%' flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
						<Flex
							w='100%'
							justifyContent={"flex-end"}
							_hover={{
								"~div": {
									clipPath: "circle(120% at 50% 50%)",
								},
							}}
						>
							<Button
								colorScheme='transparent'
								p={0}
								borderRadius={"50%"}
								minW={{ base: 7, sm: 8, md: 9, xl: 10 }}
								h={{ base: 7, sm: 8, md: 9, xl: 10 }}
								my={{ base: 8, sm: 9, xl: 10 }}
								mx={{ base: 9, sm: 12, xl: 16 }}
								zIndex={4}
							>
								<InfoIcon
									cursor={"pointer"}
									color='white'
									boxSize={{ base: 7, sm: 8, md: 9, xl: 10 }}
								/>
							</Button>
						</Flex>
						<Flex
							position='absolute'
							top={0}
							bottom={0}
							left={0}
							right={0}
							zIndex={3}
							flexDirection={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							backgroundColor='rgba(0, 0, 0, .85)'
							gap={3}
							clipPath={"circle(0 at 50% 50%)"}
							transition={"clip-path .8s"}
						>
							<Heading
								fontSize={{ base: "24px", sm: "28px", md: "36px", xl: "42px" }}
								color='rgb(182, 179, 97)'
							>
								Weather App
							</Heading>
							<Text
								maxW={{ base: "220px", sm: "300px", md: "350px", xl: "400px" }}
								textAlign={"center"}
								fontSize={{ base: "16px", sm: "18px", md: "20px", xl: "22px" }}
								fontWeight={300}
								color={"white"}
							>
								An application that allows you to check daily, hourly and current weather forecasts in a
								given place
							</Text>
						</Flex>
						<Button
							position='relative'
							zIndex={2}
							mb='10vh'
							borderRadius='50%'
							boxSize={{ base: "60px", sm: "65px", md: "80px", xl: "90px" }}
							colorScheme='transparent'
							bgColor='transparent'
							border={{ base: "1px solid white", md: "2px solid white" }}
							_before={{
								content: '""',
								position: "absolute",
								w: "100%",
								h: "100%",
								borderRadius: "50%",
								border: "1px solid white",
								opacity: 0,
								animation: `${pulse} 2s infinite`,
							}}
							onClick={handleNavigate}
						>
							<ChevronRightIcon position='relative' color='white' boxSize={{ base: 8, md: 10 }} />
						</Button>
					</Flex>
				</Flex>
				<Box position='absolute' zIndex={1} bgColor='rgba(0,0,0,0.4)' w='100%' h='100%' />
			</Box>
		</FadePageAnimation>
	)
}

export default StartPage
