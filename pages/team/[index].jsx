// * react/next 
import { useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

// * supabase
import {fetchOneTeam} from 'lib/supabaseFunc'

export default function Table() {
    const [dataDocument, setDataDocument] = useState(null)

    const router = useRouter()
    const routeIndex = router.query.index

    useEffect(async () => {
        const document = await fetchOneTeam(routeIndex)
        setDataDocument(document[0])
    }, [routeIndex])

    return (
        <div className='flex flex-col items-center gap-10 w-full'>
            <h3 className='textl-white text-5xl font-semibold text-white'>
                {dataDocument && dataDocument.title}
            </h3>
            <div className='flex gap-8 w-full'>
                <div className='flex flex-col gap-2 items-center w-[40%]'>
                    <h4 className='text-white font-semibold text-2xl'>
                        Team members
                    </h4>
                    <h5 className='text-white font-semibold text-center'>
                        Team leader - {dataDocument && dataDocument.created_by_email}
                    </h5>
                    <div className='w-96 h-[369px] bg-black bg-opacity-50 rounded-xl overflow-y-auto'>
                        <div className='flex flex-col gap-2 items-center overflow-y-auto'>
                            {
                                dataDocument && dataDocument.members !== null && dataDocument.members.map(member => (
                                    <div className='text-white'>
                                        {member.email}
                                    </div>
                                ))
                            }
                        </div> 
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-center w-[60%]'>
                    <h4 className='text-white font-semibold text-2xl'>
                        Projects
                    </h4>
                    <div className='flex gap-4 flex-wrap'>
                        {
                            dataDocument && dataDocument.projects !== null && dataDocument.projects.map((project, index) => (
                                
                                <Link href={`/table/${project.id}`} key={index} >
                                    <div className='relative w-44 h-44 bg-black bg-opacity-50 rounded-xl bg-team-bg group cursor-pointer overflow-hidden'>
                                        <div className='w-full h-7 bg-black bg-opacity-60 rounded-t-xl text-white font-semibold text-center'>
                                            Project name
                                        </div>
                                        <div className='absolute -bottom-[4.5rem] group-hover:bottom-0 transition-all rounded-b-xl w-full h-[40%] bg-black bg-opacity-70'>
                                            <h6 className='text-white font-semibold text-center mt-4'>
                                                go to project
                                            </h6>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}