// * react/next
import {useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from 'store/authSlice'

// * supabase 
import {supabase} from 'utils/supabaseClient'
import {updateTeam, fetchOneTeam} from 'lib/supabaseFunc'

import AppContext from './AppContext';



const AppProvider = (props) => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        const session = supabase.auth.session()
        dispatch(setUser(session?.user ?? null))

        if (router.pathname === '/' && user) {
            console.log('yes');
            router.push('/home')
        }

        const tables = supabase
            .from('tables')
            .on('INSERT', async payload => {
                console.log('Change received!', payload)
                const fetchData = await fetchOneTeam(payload.new.team.id)
                let tmpArr = fetchData[0].projects
                if (tmpArr === null) {
                    tmpArr = []
                }
                tmpArr.push(payload.new)
                updateTeam(payload.new.team.id, tmpArr)
            })
            .on('DELETE', async payload => {
                const fetchData = await fetchOneTeam(payload.old.team.id)
                const tmpArr = fetchData[0].projects;
                const filtered = tmpArr.filter(item => item.id !== payload.old.id)
                updateTeam(payload.old.team.id, filtered)
                if (router.query.index === payload.old.id) {
                    router.push('/home')
                }
            })
            .subscribe()

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == 'SIGNED_IN') {
                console.log('SIGNED_IN', session)
                dispatch(setUser(session?.user ?? null))
            }
            if (event == 'SIGNED_OUT') {
                console.log('SIGNED_OUT', session)
                console.log(user)
                dispatch(setUser(session?.user ?? null))
            }
        })
        
        return () => {
            authListener.unsubscribe()
        }

    }, [user])

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider