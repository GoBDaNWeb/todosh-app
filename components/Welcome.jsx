import { SiAiohttp } from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion';
import TypedReactHooksDemo from '../lib/typed'
import { slideRTL} from '../lib/motions';

export default function Welcome({handleRegister, handleLogin}) {
    return (
        <motion.div
            className='w-full absloute'
            variants={slideRTL}
            initial='before'
            animate='in'
            exit='after'
        >
            <div className="flex flex-col items-center gap-10">
                <div className='bg-black bg-opacity-20 p-4 px-10 rounded-2xl backdrop-blur-sm'>
                    <SiAiohttp className='text-9xl text-white logoAnim'/>
                </div>
                <AnimatePresence>
                    <motion.h1 
                        className="text-9xl font-bold text-gray-100 text-shadow"
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 40
                        }}
                    >
                        Welcome To The Todosh
                    </motion.h1>
                </AnimatePresence>
                <TypedReactHooksDemo/> 
                <div className="flex items-center gap-4">
                    <motion.button 
                        onClick={handleRegister}
                        className="bg-black bg-opacity-80 text-white text-xl w-80 px-8 py-4 rounded-2xl"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        Create Account
                    </motion.button>
                    <div className="h-10 w-[2px] bg-black"></div>
                    <motion.button 
                        onClick={handleLogin}
                        className="bg-black bg-opacity-80 text-white text-xl w-80 px-8 py-4 rounded-2xl"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        Sign in
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}