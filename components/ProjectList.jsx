// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// * redux 
import {useDispatch, useSelector} from 'react-redux'

// * supabase
import {fetchAllTable} from 'lib/supabaseFunc'

// * framer-motions
import { motion } from 'framer-motion';
import {drop} from '../lib/motions'

// * icons
import {AiOutlineClose} from 'react-icons/ai'

// * components
import ProjectItem from './ProjectItem';

export default function ProjectList({toggleShow}) {
    const [projects, setProjects] = useState([])

    const {showProjectList} = useSelector(state => state.table)

    useEffect(async () => {
        const data = await fetchAllTable()
        setProjects(data)
    }, [showProjectList])

    const variants = {
        open: {
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    return (
        <motion.div 
            className="w-full h-[60%] absolute top-0 z-50 flex items-center justify-center bg-white shadow"
            variants={drop}
            initial={{
                y: -500,
            }}
            animate={showProjectList ? "open" : "closed"}
        >
            <motion.div 
                className="flex gap-8 px-4 z-50 overflow-x-auto overflow-y-hidden py-8"
                variants={variants}
            >
                {
                    projects.length && projects !== null
                    ? projects.map(item => (
                        <ProjectItem key={item.timeStamp} projectData={item}/>
                    ))
                    : <div className='text-4xl'>
                        This list is empty, try to create new table
                    </div>
                }
            </motion.div>
            <motion.div 
                onClick={toggleShow}
                className="bg-gray-100 w-20 h-20 rounded-full absolute -bottom-10 flex items-center justify-center cursor-pointer shadow"
                whileHover={{
                    scale: 1.2,
                    rotate: '180deg'
                }}
                whileTap={{scale: 0.95}}
            >
                <AiOutlineClose className='text-3xl'/>
            </motion.div>
        </motion.div>
    )
}