import { useEffect, useState } from "react"

export const useGetDateTime = (time: string) => {
	const [date, setDate] = useState<string>()
	const [hour, setHour] = useState<string>()
	const [minutes, setMinutes] = useState<string>()

	useEffect(() => {
		if (!time) return

		const splittedDateTime = time.split("T")
		const splittedTime = splittedDateTime[1].split(":")

		setDate(splittedDateTime[0])
		setHour(splittedTime[0])
		setMinutes(splittedTime[1])
	}, [time])

	return { date, hour, minutes }
}
