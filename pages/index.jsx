import Welcome from '../components/Welcome';
import { useState } from 'react';
import Register from './../components/Register';
import { AnimatePresence } from 'framer-motion';
import Login from '../components/Login';

export default function Main() {
	const [register, setRegister] = useState(false)
	const [login, setLogin] = useState(false)
	
	const handleRegister = () => {
		setRegister(register = !register)
	}
	const handleLogin = () => {
		setLogin(login = !login)
	}
	
	return (
		<div className='flex items-center justify-center overflow-hidden w-full'>
			<AnimatePresence exitBeforeEnter initial={false}>
				{register && <Register handleRegister={handleRegister}/>}
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter initial={false}>
				{
					!register 
						&& !login 
						&& <Welcome 
							handleRegister={handleRegister} 
							handleLogin={handleLogin}
						/>
				}
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter initial={false}>
				{login && <Login handleLogin={handleLogin}/>}
			</AnimatePresence>			
		</div>
	)
}
