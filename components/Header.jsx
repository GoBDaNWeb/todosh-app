// * react/next
import {useRouter} from 'next/router'
import Link from 'next/link'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {toggleShowProjectList, closeProjectList} from 'store/tableSlice'
import { toggleShowTeamList, closeTeamList} from 'store/teamSlice'

// * supabase
import {signOut} from 'lib/supabaseFunc'

// * framer-motion
import { motion } from "framer-motion";

// * icons
import { SiAiohttp } from "react-icons/si";

// * components
import TeamList from '../components/TeamList';
import ProjectList from './../components/ProjectList';

export default function Header() {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const router = useRouter()

    const toggleProjectList = () => {
        dispatch(toggleShowProjectList())
        dispatch(closeTeamList())
    }

    const toggleTeamList = () => {
        dispatch(toggleShowTeamList())
        dispatch(closeProjectList())
    }

    const variant = {
        open: {
            y: 0,
            transition: {
                duration: 0.2,
                type: 'spring',
                damping: 50,
                stiffness: 400,
            },
        },
        close: {
            y: -100
        }
    }

    return (
        <div>
            <motion.div 
                className="w-full fixed flex items-center justify-evenly h-20 bg-slate-100 select-none z-[999] shadow-md"
                variants={variant}
                // animate={state.showDeleteModal ? 'close' : 'open'}
            >
                <Link
                    href={'/home'}
                >
                    <div className="flex items-center gap-2 cursor-pointer">
                        <SiAiohttp className='text-5xl text-black'/>
                        <h2 className="text-4xl font-bold">
                            Todosh
                        </h2>
                    </div>
                </Link>
                {
                    !user 
                    ? ''
                    : <nav>
                        <ul className="flex gap-8">
                            <li 
                                onClick={toggleTeamList}
                                className="text-xl font-bold cursor-pointer"
                            >
                                My team
                            </li>
                            <li 
                                onClick={toggleProjectList}
                                className="text-xl font-bold cursor-pointer"
                            >
                                My project
                            </li>
                        </ul>
                    </nav>
                }
                {
                    user && 
                    <div className='flex items-center justify-center gap-10'>
                        <h4 className="font-bold">
                            Hello, {user.displayName || user.email}!
                        </h4>
                        <motion.button 
                            onClick={() => {
                                signOut()
                                router.push('/')
                            }}
                            className={`px-6 py-1 bg-black text-white rounded-2xl`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            log out
                        </motion.button>
                    </div>
                }
            </motion.div>
            <TeamList toggleShow={toggleTeamList}/>
            <ProjectList toggleShow={toggleProjectList}/>
        </div>
    )
}