import { useEffect, useState } from "react"

interface ICoordsProps {
	latitude: number
	longitude: number
}

export const useGetUserCoords = () => {
	const [coords, setCoords] = useState<ICoordsProps>()
	const [error, setError] = useState<GeolocationPositionError>()

	const getCurrentPosition = (firstRequest?: boolean) => {
		if (!navigator.geolocation) return

		navigator.geolocation.getCurrentPosition(handleSuccess, (error) => handleError(error, firstRequest))
	}

	useEffect(() => {
		getCurrentPosition(true)
	}, [])

	const handleSuccess = (position: GeolocationPosition) => {
		const latitude = position.coords.latitude
		const longitude = position.coords.longitude
		setCoords({ latitude, longitude })
		setError(undefined)
	}

	const handleError = (error: GeolocationPositionError, firstRequest?: boolean) => {
		if (firstRequest) {
			console.error(error)
			return
		}

		setError(error)
	}

	return { coords, error, reload: getCurrentPosition }
}
