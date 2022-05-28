// * react/next
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router';

// * redux 
import {useSelector} from 'react-redux'

// * supabase 
import {updateTodo, addMessage} from 'lib/supabaseFunc'

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {  BsThreeDotsVertical } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";


export default function TodoItem({
    dataTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    toggleSetting,
    selectedSetting,
    messages}) {
    const colors = ['#F43F5E','#EC4899','#D946EF','#A855F7','#8B5CF6','#6366F1','#3B82F6','#0EA5E9','#06B6D4','#14B8A6','#10B981','#22C55E','#84CC16','#EAB308','#F59E0B','#F97316','#EF4444','#78716C','#64748B']

    const [messageContent, setMessageContent] = useState('')
    const [currentMessage, setCurrentMessage] = useState([])

    const {user} = useSelector(state => state.auth)
    const router = useRouter()
  
    useEffect(() => {
        const filtered = messages.filter(message => message.todo_id == dataTodo.id)
        setCurrentMessage(filtered)
    }, [messages])

    const selectColor = (color) => {
        updateTodo(dataTodo.id, color)
    }

    const onChange = (e) => {
        const {value} = e.target
        setMessageContent(value)
    }

    return (
        <div className={`bg-gray-200 w-[80%] min-h-12 rounded-2xl relative overflow-hidden shadow-md ${dataTodo.complete ? 'opacity-50' : ''}`}>
            <div className={`w-4 h-full absolute bg-[${dataTodo.color}] rounded-l-2xl`}></div>
            <motion.div 
                onClick={() => toggleSetting(dataTodo.id)}
                className='absolute right-0 flex justify-center items-center text-xl text-white rounded-r-lg w-5 h-full bg-indigo-600 cursor-pointer'
                whileHover={{
                    width: 30
                }}
            >
                <BsThreeDotsVertical/>
            </motion.div>
            <div className='flex items-center justify-between pl-8'>
                <h1 className='w-full'>
                    {dataTodo.title}
                </h1>
                <div className='flex items-center justify-end  pr-10 pt-2 pb-2'>
                    <div className='flex justify-end gap-3'>
                        <motion.div 
                            onClick={() => handleCompleteTodo(dataTodo.id)}
                            className='flex justify-center items-center text-lg text-white rounded-lg w-8 h-8 bg-green-600 cursor-pointer'
                            whileHover={{
                                scale: 1.1
                            }}
                        >
                            {
                                dataTodo.complete
                                ? <ImCheckboxChecked/>
                                : <ImCheckboxUnchecked/>
                            }
                        </motion.div>
                        <motion.div 
                            onClick={() => handleDeleteTodo(dataTodo.id)}
                            className='flex justify-center items-center text-2xl text-white rounded-lg w-8 h-8 bg-rose-600 cursor-pointer'
                            whileHover={{
                                scale: 1.1
                            }}
                        >
                            <MdDeleteOutline/>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <div className={`flex flex-col min-h-16 w-full bg-gray-100 px-8 py-4 ${selectedSetting === dataTodo.id ? 'flex flex-col gap-4 ' : 'hidden'}`}>
               
                <div className='flex items-center gap-4'>
                    <h2>
                        select color
                    </h2>
                    <div className='flex gap-1'>
                        {colors.map((color, index) => (
                            <div key={index}>
                                <motion.div 
                                    onClick={() => selectColor(color)}
                                    className={`w-5 h-5 bg-[${color}] cursor-pointer`}
                                    whileHover={{
                                        scale: 1.3
                                    }}
                                >
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <h2>Left a message</h2>
                    <input  
                        onKeyUp={(e) => {
                            if(e.code === 'Enter') {
                                addMessage(messageContent, user.id, router.query.index, user.email, dataTodo.id)
                                setMessageContent('')
                            }
                        }}
                        onChange={(e) => onChange(e)}
                        value={messageContent}
                        type="text"
                        className='shadow-md bg-gray-200 h-8 w-96 p-2 outline-none'
                    />
                    <div className='w-[60%] min-h-10 bg-gray-200 mt-2 p-2'>
                        {
                            currentMessage.length
                            ? currentMessage.map((message, index) => (
                                <div key={index} className='min-h-10 min-w-20 max-w-full mb-4'>
                                    <h5>{message.created_by_email}</h5>
                                    <div className='bg-black bg-opacity-60 px-2 text-white w-full min-h-10 rounded-2xl whitespace-normal'>{message.title}</div>
                                </div>
                            ))
                            : <div className='text-center'>there are no messages</div>
                        }
                    </div>
                </div>
            </div>
            <div className='hidden'>
                <div className='bg-[#F43F5E]'></div>
                <div className='bg-[#EC4899]'></div>
                <div className='bg-[#D946EF]'></div>
                <div className='bg-[#A855F7]'></div>
                <div className='bg-[#8B5CF6]'></div>
                <div className='bg-[#6366F1]'></div>
                <div className='bg-[#3B82F6]'></div>
                <div className='bg-[#0EA5E9]'></div>
                <div className='bg-[#06B6D4]'></div>
                <div className='bg-[#14B8A6]'></div>
                <div className='bg-[#10B981]'></div>
                <div className='bg-[#22C55E]'></div>
                <div className='bg-[#84CC16]'></div>
                <div className='bg-[#EAB308]'></div>
                <div className='bg-[#F59E0B]'></div>
                <div className='bg-[#F97316]'></div>
                <div className='bg-[#EF4444]'></div>
                <div className='bg-[#78716C]'></div>
                <div className='bg-[#64748B]'></div>
            </div>
        </div>
    )
}