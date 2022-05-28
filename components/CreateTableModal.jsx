// * react/next
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router';

// * redux 
import {useSelector} from 'react-redux'

// * supabase
import {createTable, fetchTeamsByCreator} from 'lib/supabaseFunc'

// * framer-motion
import { dropIn } from '../lib/motions';
import { motion } from 'framer-motion';

// * icons
import {HiOutlinePlus} from 'react-icons/hi'

// * components
import Backdrop from './Backdrop';

export default function CreateTableModal({modal}) {
    const [selectedTeam, setSelectedTeam] = useState([])
    const [value, setValue] = useState('')
    const [teams, setTeams] = useState([])

    const router = useRouter()
    const {user} = useSelector(state => state.auth)

    
    const onChange = e => {
        setValue(e.target.value)
    }

    const createNewTable = () => {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        createTable(id, value, user.id, selectedTeam.length !== 0 ? selectedTeam[0] : null, Date.now())
        router.push(`/table/${id}`)
    }

    const selectTeam = (team) => {
        setSelectedTeam([team])
    }

    useEffect(async () => {
        const data = await fetchTeamsByCreator(user.id)
        setTeams(data)
    }, [])

    return (
        <Backdrop closeModal={modal}>
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                className="w-[700px] h-[400px] rounded-2xl bg-black bg-opacity-30 backdrop-blur-sm z-50"
                variants={dropIn}
                initial='before'
                animate='in'
                exit='after'
            >
                <div className="relative w-full h-full">
                    <HiOutlinePlus 
                        onClick={modal}
                        className='absolute cursor-pointer text-white text-4xl right-[2px] top-[2px] rounded-full rotate-45'
                    />
                    <div className='flex flex-col justify-center items-center pt-10'>
                        <h4 className='text-center text-white font-bold text-3xl mb-4'>Create New Table</h4>
                        <hr className='w-full h-[2px] bg-gray-400 mb-4'/>
                        <div className='flex flex-col items-center justify-center gap-5 h-full w-full'>
                            <input
                                onChange={(e) => onChange(e)}
                                value={value}
                                type="text" 
                                placeholder="Enter New Table"
                                className='p-2 rounded-2xl w-22 outline-none bg-black bg-opacity-40 text-white'
                            />
                            <div className='text-center w-full px-8'>
                                <h3 className='text-white text-xl '>select team</h3>
                                <div className='flex justify-center w-full gap-1 overflow-x-auto'>
                                    {
                                        teams.length > 0 
                                        ? teams.map((team, index) => (
                                            <div
                                                onClick={() => selectTeam(team)}
                                                key={index}
                                                className={`bg-black text-white text-center py-1 px-4 rounded-full bg-opacity-40 cursor-pointer ${selectedTeam[0] && selectedTeam[0].id === team.id ? 'bg-white' : ''}`}
                                            >
                                                {team.title}
                                            </div>
                                        ))
                                        : <div className='text-white'>
                                            you dont have teams, to create a table, you first need to create a team
                                        </div>
                                    }
                                </div> 
                            </div>
                            <motion.button 
                                onClick={() => createNewTable()}
                                disabled={!value.length || selectedTeam.length === 0}
                                className='bg-black bg-opacity-40 text-white py-2 px-12 rounded-full font-bold disabled:opacity-50 disabled:pointer-events-none'
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                Create
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}