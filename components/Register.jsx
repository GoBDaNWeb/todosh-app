// * react/next
import { useState } from 'react'
import { useRouter } from 'next/router';

// * supabase 
import {signInWithGoogle, signUp} from 'lib/supabaseFunc'

// * framer-motion
import { motion } from 'framer-motion';
import { slideLTR } from '../lib/motions';

// * icons
import {FcGoogle} from 'react-icons/fc'

export default function Register({handleRegister}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const onChangeEmail = e => {
        const {value} = e.target
        setEmail(value)
    }
    const onChangePassword = e => {
        const {value} = e.target
        setPassword(value)
    }
    const onChangeConfirm = e => {
        const {value} = e.target
        setConfirm(value)
    }

    const router = useRouter()

    return (
        <motion.div 
            className='flex flex-col items-center gap-8 mt-16 w-full absolute'
            variants={slideLTR}
            initial='before'
            animate='in'
            exit='after'
        >
            <div className="flex flex-col items-center w-[800px] bg-gray-100 bg-opacity-80 drop-shadow-sm rounded-2xl">
                <h3 className="text-center text-2xl text-gray-900 font-bold mt-8">
                    Create account
                </h3>
                <div className="flex flex-col items-center gap-4 mt-10">
                    <input 
                        value={email}
                        onChange={onChangeEmail}
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full rounded-2xl outline-none p-2"
                    />
                    <div className="flex gap-4">
                        <input 
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-2xl outline-none p-2"
                        />
                        <input 
                            value={confirm}
                            onChange={onChangeConfirm}
                            type="password"
                            placeholder={"Confirm your password" }
                            className="w-full rounded-2xl outline-none p-2"
                        />
                    </div>
                    <motion.button 
                        onClick={() => signUp({email, password, confirm})}
                        className='border-2 border-white w-44 px-4 py-2 rounded-2xl'
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        create account
                    </motion.button>
                </div>
                <h4 className="text-3xl font-bold text-center mt-8 or w-full">
                    Or
                </h4>
                <motion.div 
                    onClick={() => signInWithGoogle()}
                    className="bg-white rounded-full p-2 my-4 cursor-pointer"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    <FcGoogle className="text-6xl"/>
                </motion.div>
            </div>
            <motion.button 
                onClick={handleRegister}
                className='px-20 py-2 bg-white text-xl font-bold bg-opacity-80 rounded-2xl'
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
            >
                Back
            </motion.button>
        </motion.div>
    )
}