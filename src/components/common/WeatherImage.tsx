import { LayoutProps } from "@chakra-ui/react"

import { NightIcon } from "../../assets/images/weatherPage/night-icon"
import { SunnyIcon } from "../../assets/images/weatherPage/sunny-icon"
import { CloudsIcon } from "../../assets/images/weatherPage/clouds-icon"
import { RainyIcon } from "../../assets/images/weatherPage/rainy-icon"
import { SnowIcon } from "../../assets/images/weatherPage/snow-icon"
import { StormIcon } from "../../assets/images/weatherPage/storm-icon"
import { FoggyIcon } from "../../assets/images/weatherPage/foggy-icon"

interface IWeatherImageProps {
	weatherType: string
}

const WeatherImage = ({ weatherType, ...props }: IWeatherImageProps & LayoutProps) => {
	switch (weatherType) {
		case "night":
			return <NightIcon boxSize={20} color='white' {...props} />
		case "sunny":
			return <SunnyIcon boxSize={20} color='white' {...props} />
		case "clouds":
			return <CloudsIcon boxSize={20} color='white' {...props} />
		case "rainy":
			return <RainyIcon boxSize={20} color='white' {...props} />
		case "foggy":
			return <FoggyIcon boxSize={20} color='white' {...props} />
		case "snow":
			return <SnowIcon boxSize={20} color='white' {...props} />
		case "storm":
			return <StormIcon boxSize={20} color='white' {...props} />
		default:
			return null
	}
}

export default WeatherImage
