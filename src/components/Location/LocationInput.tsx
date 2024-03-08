import {
	Box,
	BoxProps,
	Button,
	Divider,
	Fade,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Skeleton,
	Text,
	useDisclosure,
	useOutsideClick,
	useToast,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { CloseIcon } from "@chakra-ui/icons"

import { useGetLocationsByNameQuery } from "../../services/api/locateByName-api"
import { setLocation } from "../../services/state/slices/location-slice"
import { MyLocationIcon } from "../../assets/icons/location/location-icon"

interface ILocationInputProps {
	reloadUserCoords: () => void
	error: GeolocationPositionError | undefined
	props?: BoxProps
}

interface ILocationDataProps {
	name: string
	admin1: string
	latitude: number
	longitude: number
	country: string
}

const LocationInput = ({ reloadUserCoords, error, ...props }: ILocationInputProps) => {
	const dispatch = useDispatch()
	const inputBoxRef = useRef<HTMLInputElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchText, setSearchText] = useState("")
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data, isLoading } = useGetLocationsByNameQuery(searchText)
	const toast = useToast()
	useOutsideClick({
		ref: inputBoxRef,
		handler: onClose,
	})

	useEffect(() => {
		if (!error) return
		toast({
			title: "Geolocation",
			description: error.message,
			status: "error",
			duration: 2000,
			isClosable: true,
		})
	}, [error])

	const handleSelectLocation = (item: ILocationDataProps) => {
		setSearchText(item.name)

		dispatch(
			setLocation({
				locationRegion: { name: item.name, country: item.country },
				coords: { latitude: item.latitude, longitude: item.longitude },
			}),
		)

		onClose()
	}

	const handleClearInput = () => {
		setSearchText("")
		inputRef.current?.focus()
	}

	return (
		<Box
			ref={inputBoxRef}
			position={"relative"}
			w={{ base: "100%", sm: "350px", md: "450px", xl: "500px" }}
			borderRadius={4}
			{...props}
		>
			<InputGroup>
				<InputLeftAddon
					h={["30px", "32px", "37px", "40px", "45px"]}
					bgColor={"transparent"}
					border={"none"}
					p={0}
					m={0}
				>
					<Button
						bgColor={"blackAlpha.600"}
						w='100%'
						h='100%'
						borderLeftRadius={24}
						borderRightRadius={0}
						border={"1px solid"}
						borderColor={"gray.400"}
						borderRight={"none"}
						p={0}
						_hover={{
							bgColor: "blackAlpha.500",
						}}
						onClick={() => reloadUserCoords()}
					>
						<MyLocationIcon boxSize={{ base: 4, md: 5, xl: 6 }} color='whiteAlpha.800' />
					</Button>
				</InputLeftAddon>
				<Input
					ref={inputRef}
					value={searchText}
					fontSize={[16, 17, 18, 20, 21]}
					borderColor={"gray.400"}
					h={["30px", "32px", "37px", "40px", "45px"]}
					w='100%'
					borderRadius={24}
					pe={0}
					bgColor={"blackAlpha.800"}
					color='white'
					onChange={(e) => setSearchText(e.target.value)}
					onFocus={onOpen}
				/>
				<InputRightElement
					display={isOpen ? "flex" : "none"}
					w={{ base: "20px", sm: "30px", md: "45px", xl: "50px" }}
					h='100%'
					justifyContent={"flex-end"}
					borderRightRadius={24}
				>
					<Button
						h='100%'
						me='auto'
						borderRightRadius={24}
						colorScheme={"transparent"}
						onClick={handleClearInput}
					>
						<CloseIcon color='white' boxSize={{ base: 2.5, sm: 3, xl: 4 }} />
					</Button>
				</InputRightElement>
			</InputGroup>
			<Fade in={isOpen && data?.results?.length} style={{ position: "absolute", width: "100%", zIndex: 2 }}>
				<Skeleton isLoaded={!isLoading} borderRadius={24} startColor='blackAlpha.600' endColor='blackAlpha.900'>
					<Flex
						display={isOpen && data?.results?.length ? "flex" : "none"}
						flexDirection={"column"}
						borderRadius={24}
						border={"1px solid "}
						borderColor={"gray.400"}
						bgColor={"blackAlpha.900"}
					>
						{data?.results?.map((item: ILocationDataProps, index: number) => (
							<React.Fragment key={index}>
								{!!index && <Divider borderColor={"gray.400"} />}
								<Button
									h='auto'
									py={2}
									bgColor={"transparent"}
									borderTopRadius={!index ? 24 : 0}
									borderBottomRadius={index === data?.results?.length - 1 ? 24 : 0}
									color='white'
									_hover={{
										bgColor: "white",
										color: "black",
									}}
									whiteSpace={"pre-wrap"}
									wordBreak={"break-word"}
									onClick={() => handleSelectLocation(item)}
								>
									<Flex flexDirection={"column"} gap={{ base: 0.5, md: 1 }}>
										<Text fontSize={[15, 16, 17, 18, 19]}>{item?.name}</Text>
										<Text></Text>
										<Text fontSize={[13, 14, 16, 17, 18]} fontWeight={400}>
											{item?.admin1 && `${item?.admin1} | `}
											{item?.country}
										</Text>
									</Flex>
								</Button>
							</React.Fragment>
						))}
					</Flex>
				</Skeleton>
			</Fade>
		</Box>
	)
}

export default LocationInput
