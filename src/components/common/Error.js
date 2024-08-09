import { FaSkullCrossbones } from "react-icons/fa6";

const Error = ()=>{
    return(
        <div className="bg-gradient-to-r from-black to-[#222831] text-white w-full h-screen flex flex-row justify-center sm:items-center pt-[65%] sm:pt-0">
            <FaSkullCrossbones size={40}/>
            <h1 className="text-xl sm:text-3xl font-semibold uppercase tracking-widest ml-5 font-mono mt-1 sm:mt-0">404 Not Found</h1>
        </div>
    )
}

export default Error;