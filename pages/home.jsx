import { useState, useEffect } from 'react';
import {BsPlusLg} from 'react-icons/bs'
import CreateTeamModal from '../components/CreateTeamModal'
import CreateTableModal from '../components/CreateTableModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
	const [showTeam, setShowTeam] = useState(false)
	const [showTable, setShowTable] = useState(false)

	
	const showModalTeam = () => {
		setShowTeam(showTeam = !showTeam)
	}
	
	const showModalTable = () => {
		setShowTable(showTable = !showTable)
	}

	useEffect(() => {
		
	}, [showTeam, showTable])

	return (
		<div className='flex items-center justify-center'>
			<AnimatePresence>
				{showTeam && <CreateTeamModal show={showTeam} modal={showModalTeam}/>}
				{showTable && <CreateTableModal show={showTable} modal={showModalTable}/>}
			</AnimatePresence>
			<div className="flex justify-evenly gap-64 items-center">
				<div>
					<h3 className='text-center text-white text-2xl font-bold mb-4'>
						Create New Team
					</h3>
					<motion.div 
						onClick={showModalTeam}
						className="w-64 h-64 flex justify-center items-center rounded-2xl bg-opacity-30 bg-black cursor-pointer group"
						whileHover={{scale: 1.05}}
                		whileTap={{scale: 0.95}}
					>
						<BsPlusLg className='text-8xl opacity-30 group-hover:rotate-90 group-hover:scale-125 transition duration-150'/>
					</motion.div>
				</div>
				<div>
					<h3 className='text-center text-white text-2xl font-bold mb-4'>
						Create New Task Table
					</h3>
					<motion.div 
						onClick={showModalTable}
						className="w-64 h-64 flex justify-center items-center rounded-2xl bg-opacity-30 bg-white cursor-pointer group"
						whileHover={{scale: 1.05}}
                		whileTap={{scale: 0.95}}
					>
						<BsPlusLg className='text-8xl opacity-30 group-hover:rotate-90 group-hover:scale-125 transition duration-150'/>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
