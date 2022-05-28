// * react/next
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {toggleShowDeleteModal} from 'store/tableSlice'

// * supabase
import {supabase} from 'utils/supabaseClient'
import {
    fetchOneTable, 
    addTodo, 
    deleteTable, 
    deleteTodo, 
    fetchTodos, 
    fetchMessage, 
    deleteTodoByTableId,
    deleteMessageByTableId,
    updateTodoComplete
} from 'lib/supabaseFunc'

// * framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// * icons 
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";

// * components
import TodoItem from 'components/TodoItem';
import DeleteModal from 'components/DeleteModal';

export default function Table() {
    const [dataDocument, setDataDocument] = useState(null)
    const [todos, setTodos] = useState([])
    const [messages, setMessages] = useState([])
    const [newTodo, setNewTodos] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [updateTodo, setUpdateTodos] = useState(null)
    const [remoreTodo, setRemoteTodo] = useState(null)
    const [todoTitle, setTodoTitle] = useState('')
    const [deleteTodoModal, setDeleteTodoModal] = useState(false)
    const [deletingTodo, setDeletingTodo] = useState({})
    const [selectedSetting, setSelectedSetting] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {showDeleteModal} = useSelector(state => state.table)
    
    const dispatch = useDispatch()

    const router = useRouter()
    const routeIndex = router.query.index

    useEffect(() => {
        const fetchData = fetchMessage(routeIndex)
        fetchData.then(data => setMessages(data))
        supabase
            .from('todo_item')
            .on('INSERT', payload => {
                setNewTodos(payload.new)
            })
            .on('UPDATE', payload => {
                setUpdateTodos(payload.new)
            })
            .on('DELETE', payload => {
                console.log(payload)
                setRemoteTodo(payload.old)
            })
            .subscribe()

        supabase
            .from('message')
            .on('INSERT', payload => {
                setNewMessage(payload.new)
            })
            .subscribe()
    }, [])

    useEffect(() => {
        if (newTodo) {
            setTodos(todos.concat(newTodo))
        } 
    }, [newTodo])

    useEffect(() => {
        if (newMessage) {
            setMessages(messages.concat(newMessage))
        } 
    }, [newMessage])

    useEffect(async () => {
        if (todos.length > 0) {
            const data = await fetchTodos(routeIndex)
            data.sort((a, b) => {
                if (a.order > b.order) return 1
                if (a.order < b.order) return -1
            })
            setTodos(data)
        }
    }, [updateTodo, remoreTodo])

    useEffect(async () => {
        const document = await fetchOneTable(routeIndex)
        setDataDocument(document[0])

        const fetchData = await fetchTodos(routeIndex)
        setTodos(fetchData)
    }, [routeIndex])

    const onChange = (e) => {
        const {value} = e.target
        setTodoTitle(value)
    }


    const toggleSetting = (i) => {
        if (selectedSetting == i) {
            return setSelectedSetting(null)
        }
        setSelectedSetting(i)
    }
    
    const createTodo = () => {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        const newTodo = {
            id: id,
            inserted_at: Date.now(),
            content: todoTitle,
            complete: false,
            created_by_id: user.id,
            created_by_email: user.email,
            color: '#64748B',
            complete: false,
            table_id: routeIndex
        }
        addTodo(newTodo)
        setTodoTitle('')
    }

    const deleteTableFunc = () => {
        deleteTable(routeIndex) 
        deleteTodoByTableId(routeIndex)
        deleteMessageByTableId(routeIndex)
        router.push('/home')
    }

    const closeModalFunc = () => {
        dispatch(toggleShowDeleteModal())
    }

    return (

        <div className='flex items-center justify-center mt-32 mb-10'>
            <AnimatePresence>
                {showDeleteModal && <DeleteModal modal={closeModalFunc} deleteTable={deleteTableFunc} document={dataDocument}/>}
            </AnimatePresence>
            <div className='flex flex-col items-center justify-center overflow-y-auto'>
                <div className="relative text-center mb-12 bg-white  w-full rounded-2xl">
                    <h2 className='text-4xl font-bold'>
                        {dataDocument && dataDocument.title}
                    </h2>
                    <div>
                        <h4>
                            executive team - {dataDocument && dataDocument.team.title}
                        </h4>
                        <div>
                            <h5>
                               team leader - <span className='font-semibold'>{dataDocument && dataDocument.team.created_by_email}</span> 
                            </h5>
                            {
                                dataDocument && dataDocument.team.members
                                && dataDocument.team.members.map((member, index) => (
                                    <div key={index}>
                                        {member.email}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[80vw] min-h-96 bg-white rounded-2xl p-4">
                    <div className="flex items-center justify-end">
                        {
                            user && dataDocument && dataDocument.created_by === user.id
                            &&  <motion.button
                                    onClick={() => dispatch(toggleShowDeleteModal())}
                                    className='flex items-center my-2 bg-rose-600 text-white px-4 rounded-full'
                                    whileHover={{
                                        scale: 1.05
                                    }}
                                    whileTap={{
                                        scale: 0.95
                                    }}
                                >
                                    delete project
                                    <MdDeleteOutline 
                                        className='text-xl'
                                    />
                                </motion.button>
                        }
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <input  
                            onKeyUp={(e) => {
                                if(e.code === 'Enter') {
                                    createTodo()
                                    setTodoTitle('')
                                }
                            }}
                            onChange={(e) => onChange(e)}
                            value={todoTitle}
                            type="text"
                            className='shadow-md bg-gray-200 h-8 w-96 p-2 outline-none'
                            placeholder='add todo'
                        />
                        <button 
                            onClick={() => createTodo()}
                            className='flex items-center justify-center bg-gray-200 h-8 w-10 shadow-md text-xl'
                        >
                            <AiOutlineSend/>
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-3 justify-center mt-6">
                        {
                            todos.map((todo) => {
                                return (
                                    <TodoItem key={todo.id} dataTodo={todo} toggleSetting={toggleSetting} selectedSetting={selectedSetting} messages={messages}/>
                                )
                            }) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}