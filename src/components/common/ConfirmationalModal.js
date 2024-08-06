import { useEffect } from "react";

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
        <div className="fixed h-full w-full inset-0 z-50 bg-black backdrop-blur-sm bg-opacity-10 flex justify-center items-center">
            <div className="bg-[#222831] w-[90%] sm:w-[55%] md:w-[45%] lg:w-[35%] lg:h-[35%] -mt-[20%] sm:-mt-0 rounded-lg flex flex-col justify-center items-center p-10">
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
