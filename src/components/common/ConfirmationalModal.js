import { useEffect } from "react";
import { logout } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const ConfirmationalModal = ({modalData}) => {

    const {text1,text2,btn1Text,btn2Text,btn1Handler,btn2Handler} = modalData;

    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed h-screen w-full top-0 z-50 bg-black backdrop-blur-sm bg-opacity-10 flex justify-center items-center">
            <div className="bg-[#222831] size-[30%] rounded-lg flex flex-col justify-center items-center p-10">
                <h1 className="text-xl">{text1}</h1>
                <h1 className="mt-2">{text2}</h1>
                <div className="relative flex space-x-10 mt-7">
                    <button className="bg-[#76ABAE] w-32 py-2 rounded-lg" onClick={btn1Handler}>{btn1Text}</button>
                    <button className="bg-[#EEEEEE] w-32 py-2 rounded-lg text-black" onClick={btn2Handler}>{btn2Text}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationalModal;
