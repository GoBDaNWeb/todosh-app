//* redux
import {useDispatch} from 'react-redux'
import {toggleShowDeleteModal} from 'store/tableSlice'

// * framer-motion
import { dropIn } from '../lib/motions';
import { motion } from 'framer-motion';

// * icons
import {HiOutlinePlus} from 'react-icons/hi'

// * components
import Backdrop from './Backdrop';

export default function DeleteModal({modal, deleteTable, document}) {
    return (
        <Backdrop closeModal={modal}>
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                className="w-[700px] h-[300px] rounded-2xl bg-black bg-opacity-60 backdrop-blur-sm z-50"
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
                    <div className='flex flex-col items-center justify-center pt-10'>
                        <h3 className='text-2xl text-white '>You realy want delete this project?</h3>
                        <h5 className='text-xl font-bold text-white pt-4'>project title - {document.title}</h5>
                        <div className='flex items-center justify-center gap-10 pt-20'>
                            <button 
                                onClick={() => {
                                    deleteTable()
                                    modal()
                                }}
                                className='w-44 py-2 bg-rose-700 text-white rounded-full'
                            >
                                Delete
                            </button>
                            <button 
                                onClick={modal}
                                className='w-44 py-2 bg-sky-700 text-white rounded-full'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}