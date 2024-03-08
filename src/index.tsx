import * as ReactDOM from "react-dom/client"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { Provider } from "react-redux"

import { App } from "./App"
import { store } from "./services/state/store"

const container = document.getElementById("root")
if (!container) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(container)

root.render(
	<ChakraProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ChakraProvider>,
)
