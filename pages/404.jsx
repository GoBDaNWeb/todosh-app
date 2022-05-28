import {useRouter} from 'next/router'

export default function Custom404() {
    const router = useRouter()
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='text-white text-center text-3xl'>
                oooooooops.... <br/> it seems that you went to the wrong place
            </div>
            <button
                onClick={() => router.push('/home')}
                className='text-white py-1 px-4 bg-black bg-opacity-50 rounded-full'
            >
                go home
            </button>
        </div>
    )
}