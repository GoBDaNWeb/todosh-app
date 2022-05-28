import Backdrop from "./Backdrop"

export default function DeleteTodoModal({data, handleDeleteTodo, deleteTodo}) {
    return (
        <Backdrop closeModal={handleDeleteTodo}>
            <div
                
                className="w-[400px] h-[200px] rounded-2xl bg-black bg-opacity-30 backdrop-blur-sm z-50"
            >
                <div className="flex flex-col items-center justify-center gap-6 h-full w-full">
                    <h2 className='text-white text-xl text-center'>
                        You realy want delete
                        <br/> 
                        <span className="font-bold">{data.content}</span>
                        <br />
                        <span className="font-bold">id - {data.id}</span>
                    </h2>
                    <div className='flex items-center gap-4'>
                        <button 
                            onClick={() => deleteTodo(data.id)}
                            className="bg-rose-600 w-28 text-white rounded-2xl"
                        >
                            delete
                        </button>
                        <button 
                            onClick={handleDeleteTodo(data.id)}
                            className="bg-sky-600 w-28 text-white rounded-2xl"
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </Backdrop>
    )
}