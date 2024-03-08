import { Routes, Route, BrowserRouter } from "react-router-dom"

import StartPage from "./pages/StartPage"
import WeatherPage from "./pages/WeatherPage"
import Layout from "./layout/Layout"

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='*' element={<StartPage />} />
					<Route path='/weather' element={<WeatherPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
