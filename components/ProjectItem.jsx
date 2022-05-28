// * react/next 
import Link from 'next/link'

// * redux 
import {useDispatch} from 'react-redux'
import {toggleShowProjectList} from 'store/tableSlice'

// * framer-motion 
import { motion } from 'framer-motion';

// * icons
import { BsArrowsFullscreen } from "react-icons/bs";

// * moment
import moment from 'moment';

export default function ProjectItem({projectData}) {
	const dispatch = useDispatch()

	const toggleProject = () => {
		dispatch(toggleShowProjectList())
	}

	const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
		y: { 
			stiffness: 500, 
			velocity: -100, 
			type: 'spring',
			damping: 25 
		}
		}
	},
	closed: {
		y: -500,
		opacity: 0,
		transition: {
		y: { stiffness: 500 },
		damping: 25,
		}
	}
	};

  return (
	<Link
		href={`/table/${projectData.id}`}
	>
      	<motion.div 
			onClick={toggleProject}
			className='min-w-[240px] min-h-[240px] bg-gray-100 cursor-pointer p-2 shadow-md flex flex-col items-center justify-between'
			variants={variants}
			while
			whileHover={{
				scale: 1.05,
			}}
			whileTap={{
				scale: 0.95
			}}
			initial={{
         		y: -500
       		}}
      	>
        	<h3 className='text-center font-bold text-2xl'>
        		{projectData.title}
         	</h3>
			<div className=''>
				created at - {moment(projectData.timeStamp).format('MMMM Do')}
			</div>
      	</motion.div>
    </Link>
  )
}
