import Header from "./Header";

export default function Layout({children}) {
    return (
        <div>
            <Header/>
            <div className="flex justify-center items-center min-h-screen w-full bg-gradient">
                {children}
            </div>
        </div>
    )
}