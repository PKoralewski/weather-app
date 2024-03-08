import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react"

const Layout = () => {
	return (
		<Box as='main' overflowX={"hidden"} w='100vw' h='100vh'>
			<Outlet />
		</Box>
	)
}

export default Layout
