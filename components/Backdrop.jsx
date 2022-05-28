// * framer-motion
import { motion } from "framer-motion"

export default function Backdrop({children, closeModal}) {
    return (
        <motion.div 
            onClick={closeModal}
            className="flex items-center justify-center h-full w-full bg-black fixed top-0 bottom-0 bg-opacity-50 z-50 overflow-y-hidden"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}
		</motion.div>
    )
}