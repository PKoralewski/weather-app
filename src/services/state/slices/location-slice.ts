import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILocationRegionProps {
	name: string
	country: string
}

interface ILocationCoordsProps {
	latitude: number
	longitude: number
}

interface LocationState {
	locationRegion: ILocationRegionProps | null
	coords: ILocationCoordsProps | null
}

const initialState: LocationState = {
	locationRegion: null,
	coords: null,
}

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation(state, action: PayloadAction<LocationState>) {
			state.locationRegion = action.payload.locationRegion
			state.coords = action.payload.coords
		},
		clearLocation(state) {
			state.locationRegion = null
			state.coords = null
		},
	},
})

export const { setLocation, clearLocation } = locationSlice.actions

export default locationSlice
