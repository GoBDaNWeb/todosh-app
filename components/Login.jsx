import { useState } from "react"
import { motion } from "framer-motion"
import {slideLTR} from "../lib/motions"
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from 'next/router';
import {signIn} from 'lib/supabaseFunc'

export default function LoginModal({handleLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = e => {
        const {value} = e.target
        setEmail(value)
    }
    const onChangePassword = e => {
        const {value} = e.target
        setPassword(value)
    }

    const router = useRouter()

    return (
        <motion.div 
            className='flex flex-col items-center gap-8 mt-16 w-full absolute overflow-hidden'
            variants={slideLTR}
            initial='before'
            animate='in'
            exit='after'
        >
             <div className="flex flex-col items-center w-[800px] bg-gray-100 bg-opacity-80 drop-shadow-sm rounded-2xl">
                <h3 className="text-center text-2xl text-gray-900 font-bold mt-8">
                    log in to your account
                </h3>
                <div className="flex flex-col items-center gap-4 mt-10 w-full">
                    <input 
                        value={email}
                        onChange={onChangeEmail}
                        type="email" 
                        placeholder="Enter your email"
                        className="w-[50%] rounded-2xl outline-none p-2"
                    />
                    <input 
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            placeholder="Enter your password"
                            className="w-[50%] rounded-2xl outline-none p-2"
                    />
                    <motion.button
                        onClick={() => signIn(email, password)} 
                        className='border-2 border-white w-44 px-4 py-2 rounded-2xl'
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        login
                    </motion.button>
                </div>
                <h4 className="text-3xl font-bold text-center mt-8 or w-full">
                    Or
                </h4>
                <motion.div 
                    onClick={() => googleAuth(router)}
                    className="bg-white rounded-full p-2 my-4 cursor-pointer"
                    whileHover={{scale: 1.20}}
                    whileTap={{scale: 0.95}}
                >
                    <FcGoogle className="text-6xl"/>
                </motion.div>
            </div>
            <motion.button 
                onClick={handleLogin}
                className='px-20 py-2 bg-white text-xl font-bold bg-opacity-80 rounded-2xl'
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
            >
                Back
            </motion.button>
        </motion.div>
    )
}