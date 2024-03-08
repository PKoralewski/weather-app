import { PropsWithChildren } from "react"
import { AnimatePresence, motion } from "framer-motion"

const FadePageAnimation = ({ children }: PropsWithChildren) => {
	return (
		<AnimatePresence>
			<motion.div initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default FadePageAnimation
