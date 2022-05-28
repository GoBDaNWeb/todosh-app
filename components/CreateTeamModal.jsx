// * react/next
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'

// * redux 
import {useSelector} from 'react-redux'

// * supabase 
import {fetchUsers, createTeam} from 'lib/supabaseFunc'

// * framer-motion
import { dropIn } from '../lib/motions';
import { motion } from 'framer-motion';

// * icons
import {HiOutlinePlus} from 'react-icons/hi'

// * components
import Backdrop from './Backdrop';

export default function CreateTeamModal({show, modal}) {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])

    const {user} = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        const fetchData = fetchUsers()
        fetchData.then(data => setUsers(data))
    }, [])

    useEffect(() => {
        if(users !== null) {
            const filtered = users.filter(item => item.id !== user.id)
            setFilteredUsers(filtered)
        }
    }, [users])

    useEffect(() => {
        if (filteredUsers !== null) {
            const searched = filteredUsers.filter(user => (user.email).toLowerCase().includes(searchValue.toLowerCase()))
            setSearchedUsers(searched)
        }
    }, [searchValue])

    const selectUser = (user) => {
        const tmpArr = selectedUsers
        if(selectedUsers.includes(user)) {
            const filtered = tmpArr.filter(item => item.id !== user.id)
            setSelectedUsers([...filtered])
        }
        if(!selectedUsers.includes(user)) {
            tmpArr.push(user)
            setSelectedUsers([...tmpArr])
        }
    }
    


    const onChange = e => {
        setValue(e.target.value)
    }

    const createNewTeam = () => {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);

        const newTeam = {
            id: id,
            title: value,
            created_by_id: user.id,
            created_by_email: user.email,
            members: selectedUsers
        }
        createTeam(newTeam)
        router.push(`/team/${id}`)
    }

    return (
        <Backdrop closeModal={modal}>
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                className="w-[700px] h-[600px] rounded-2xl bg-black bg-opacity-30 backdrop-blur-sm z-50"
                variants={dropIn}
                initial='before'
                animate='in'
                exit='after'
            >
                <div className="relative w-full h-full">
                    <HiOutlinePlus 
                        onClick={modal}
                        className='absolute cursor-pointer text-white text-4xl right-[2px] top-[2px] rounded-full rotate-45'/
                    >
                    <div className='flex flex-col justify-center items-center pt-10'>
                        <h4 className='text-center text-white font-bold text-3xl mb-4'>Create New Team</h4>
                        <hr className='w-full h-[2px] bg-gray-400 mb-4'/>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <div className='w-full'>
                                <input 
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    type="text" 
                                    placeholder="Enter New Team"
                                    className='p-2 rounded-2xl w-full outline-none bg-black bg-opacity-40 text-white'
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-[400px] h-[300px] bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl'>
                                <input 
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    type="text" 
                                    placeholder='Find User'
                                    className='w-full h-8 rounded-t-2xl bg-black bg-opacity-70 text-white outline-none p-6'
                                />
                                <div className='flex flex-col  gap-1'>
                                    {
                                        searchValue.length > 0
                                        && 
                                        searchedUsers.map((user, index) => (
                                            <div 
                                                onClick={() => selectUser(user)}
                                                key={index} 
                                                className={`flex justify-between items-center w-full bg-black bg-opacity-40 text-white p-2 cursor-pointer ${selectedUsers.includes(user) ? 'bg-white' : ''}`}
                                            >
                                                {user.email}
                                            </div>
                                        ))
                                    }
                                    {
                                        searchValue.length === 0
                                        &&
                                        filteredUsers.map((user, index) => (
                                            <div 
                                                onClick={() => selectUser(user)}
                                                key={index} 
                                                className={`flex justify-between items-center w-full bg-black bg-opacity-40 text-white p-2 cursor-pointer ${selectedUsers.includes(user) ? 'bg-white' : ''}`}
                                            >
                                                {user.email}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <motion.button 
                            onClick={() => createNewTeam()}
                                className='bg-black bg-opacity-40 text-white py-2 px-12 rounded-full font-bold'
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