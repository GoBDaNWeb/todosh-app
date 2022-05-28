import Layout from '../components/Layout'
import AppProvider from '../context/AppProvider'
import {Provider, useDispatch} from 'react-redux'
import store from '../store'
import '../styles/globals.css'
import { useRouter } from 'next/router';
import {supabase} from 'utils/supabaseClient'
import { useEffect, useState } from 'react';
import {useSelector, } from 'react-redux'
import {setUser} from 'store/authSlice'

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({})
    const router = useRouter()
    // onAuthStateChanged(auth, (user) => {
    //     if(user) {
    //         setUser(user)
    //         if(router.pathname === '/' && user) {
    //             router.push('/home')
    //         }
    //     } else {
    //         if(router.pathname !== '/' && !user) {
    //             router.push('/')
    //         }
    //     }
    // })

    

    return (
        <Provider store={store}>
            <AppProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppProvider>
        </Provider>
    )
}

export default MyApp
