import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { weatherApi } from "../api/weather-api"
import { locateByNameApi } from "../api/locateByName-api"
import { locateByCoordsApi } from "../api/locateByCoords-api"
import locationSlice from "./slices/location-slice"

export const store = configureStore({
	reducer: {
		location: locationSlice.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		[locateByNameApi.reducerPath]: locateByNameApi.reducer,
		[locateByCoordsApi.reducerPath]: locateByCoordsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(weatherApi.middleware, locateByNameApi.middleware, locateByCoordsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
