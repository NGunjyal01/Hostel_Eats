import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";
import { login } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const LogIn = () => {

    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit,formState: {errors}} = useForm();

    const handleEyeBtnClick = ()=>{
        setShowPassword(!showPassword);
    }

    const handleLoginBtn = (data)=>{
        login(data,navigate,dispatch);
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white pt-[60%] sm:pt-[27%] md:pt-[20%] lg:pt-[15%] xl:pt-[12%] w-full">
            <form onSubmit={handleSubmit(handleLoginBtn)} className="w-full pl-[7%] sm:pl-[15%] md:pl-[20%] lg:pl-[42%] xl:pl-[38%] text-sm md:text-base">
                <h1 className="text-2xl md:text-4xl">Welcome Back</h1>
                <div className="w-[95%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-10">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" name="email" placeholder="Enter Email Address" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2" 
                    {...register('email',{required:{value:true,message:"Please Enter Email Address"}})}/>
                    {errors.email && ( <span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.email.message}
                    </span>)}
                </div>
                <div className="w-[95%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-5">
                    <label htmlFor="password">Password</label>
                    <input type={!showPassword?"password":"text"} id="password" name="password" placeholder="Enter Password" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2"
                    {...register('password',{required:{value:true,message:"Please Enter Password"}})}/>
                    <button className="absolute  bottom-11 right-4" type="button" onClick={handleEyeBtnClick}>{!showPassword?<IoEye/>:<IoEyeOff/>}</button>
                    <button className="absolute -bottom-1 right-1 w-fit text-[0.7rem] sm:text-sm">Forget Password</button>
                    {errors.password && ( <span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.password.message}
                    </span>)}
                </div>
                <button className="bg-[#76ABAE] w-[95%] sm:w-[60%] md:w-[55%] xl:w-[45%] py-3 rounded-lg mt-12" type="submit">LogIn</button>
            </form>
        </div>
    )   
}

export default LogIn;
