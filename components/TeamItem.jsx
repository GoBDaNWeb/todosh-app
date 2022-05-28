// * react/next 
import Link from 'next/link'

// * redux 
import {useDispatch} from 'react-redux'
import {toggleShowTeamList} from 'store/teamSlice'

// * framer-motion 
import { motion } from 'framer-motion';

// * icons
import { BsArrowsFullscreen } from "react-icons/bs";

// * moment
import moment from 'moment';

export default function TeamItem({teamData}) {
	const dispatch = useDispatch()

	const toggleProject = () => {
		dispatch(toggleShowTeamList())
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
		href={`/team/${teamData.id}`}
	>
      	<motion.div 
			onClick={toggleProject}
			className='w-60 h-60 bg-gray-100 cursor-pointer p-2 shadow-md flex flex-col items-center justify-between'
			variants={variants}
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
        		{teamData.title}
         	</h3>
			<div className=''>
				created at - {moment(teamData.timeStamp).format('MMMM Do')}
			</div>
      	</motion.div>
    </Link>
  )
}
