import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { resetPassword } from "../services/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { clearEmail } from "../slices/emailSlice";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email=useSelector((state)=>state.email.email)
    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false });
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const handleReset = (data) => {
        console.log("email=====>",email);
        console.log("newPass=====>",data.newPassword);
        console.log("cnfNewPass=====>",data.confirmPassword);
        const resetPassData={
            email,
            password:data.newPassword,
            confirmPassword:data.confirmPassword
        }
        resetPassword(resetPassData, navigate);
        console.log("object======>",resetPassData);
        dispatch(clearEmail());
    }

    const handleEyeBtnClick = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    }

    const password = watch('newPassword');

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white pt-[40%] sm:pt-[27%] md:pt-[20%] lg:pt-[15%] xl:pt-[12%] w-full">
            <form onSubmit={handleSubmit(handleReset)} className="w-full pl-[10%] sm:pl-[15%] md:pl-[20%] lg:pl-[30%] xl:pl-[35%] text-sm md:text-base">
                <h1 className="text-2xl md:text-4xl">Reset Password</h1>
                <div className="w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-10">
                    <label htmlFor="newPassword">New Password</label>
                    <input type={!showPassword.newPassword ? "password" : "text"} id="newPassword" name="newPassword" placeholder="Enter New Password" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2" 
                    {...register('newPassword', { required: { value: true, message: "Please Enter New Password" } })}/>
                    {errors.newPassword && (<span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.newPassword.message}
                    </span>)}
                    <button className="absolute bottom-11 right-4" type="button" onClick={() => handleEyeBtnClick('newPassword')}>{!showPassword.newPassword ? <IoEye /> : <IoEyeOff />}</button>
                </div>
                <div className="w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-5">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type={!showPassword.confirmPassword ? "password" : "text"} id="confirmPassword" name="confirmPassword" placeholder="Confirm New Password" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2" 
                    {...register('confirmPassword', {
                        required: { value: true, message: "Please Confirm New Password" },
                        validate: value => value === password || "Passwords do not match"
                    })}/>
                    {errors.confirmPassword && (<span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.confirmPassword.message}
                    </span>)}
                    <button className="absolute bottom-11 right-4" type="button" onClick={() => handleEyeBtnClick('confirmPassword')}>{!showPassword.confirmPassword ? <IoEye /> : <IoEyeOff />}</button>
                </div>
                <button className="bg-[#76ABAE] w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] py-3 rounded-lg mt-12" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword;
