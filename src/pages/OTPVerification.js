import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authAPI";
import { forgotPassword } from "../services/authAPI";
import { useSelector } from "react-redux";

const OTPVerification = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const email = useSelector((state) => state.email.email);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleNext = (data) => {
        const otpData = {
            email,
            otp: data.otp
        };
        verifyOtp(otpData, navigate);
        console.log("email=======>",email);
        console.log("otp=======>",data.otp);
        console.log("object=======>",otpData);
    }

    const handleResendOTP = () => {
        if (isResendDisabled) return;
        // Logic to resend OTP goes here
        forgotPassword(email,navigate);
        console.log("OTP Resent");
        setTimer(30);
        setIsResendDisabled(true);
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white pt-[50%] sm:pt-[15%] w-full">
            <form onSubmit={handleSubmit(handleNext)} className="w-full pl-[10%] sm:pl-[15%] md:pl-[20%] lg:pl-[30%] xl:pl-[35%] text-sm md:text-base">
                <h1 className="text-2xl md:text-4xl">OTP Verification</h1>
                <div className="w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-10">
                    <label htmlFor="otp">Enter OTP</label>
                    <input type="text" id="otp" name="otp" placeholder="Enter OTP" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2" 
                    {...register('otp', { required: { value: true, message: "Please Enter OTP" } })}/>
                    {errors.otp && (<span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.otp.message}
                    </span>)}
                </div>
                <div className="flex items-center justify-between w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%]">
                    {timer > 0 ? (
                        <span className="text-gray-400">Resend OTP in {formatTime(timer)}</span>
                    ) : (
                        <button 
                            className={`text-[#76ABAE] ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                            type="button" 
                            onClick={handleResendOTP}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
                <button className="bg-[#76ABAE] w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] py-3 rounded-lg mt-12" type="submit">Next</button>
            </form>
        </div>
    )
}

export default OTPVerification;
