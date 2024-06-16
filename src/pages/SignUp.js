import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye,IoEyeOff } from "react-icons/io5";
import { signup } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const SignUp = () => {

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [accountType,setAccountType] = useState("Customer");
    const {register,handleSubmit,formState: {errors}} = useForm();
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[90%] px-2 py-2 rounded-md mt-2";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = ()=>{
        setShowConfirmPassword(!showConfirmPassword);
    }
    const handleTabClick = (type)=>{
        setAccountType(type);
    }

    const handleOnSubmit = (data)=>{
        console.log(data);
        if(data.password!==data.confirmPassword){
            return toast.error("Passwords do not match");
        }
        //signingup
        signup(data,navigate,dispatch);
        //reset
        setAccountType("Customer");
    }

    const accountTypeInfo = [{id:1,name:"Customer",type:"Customer"},
        {id:2,name:"Owner",type:"Owner"}];

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-fit text-white pt-[35%] sm:pt-[25%] md:pt-[17%] lg:pt-[14%] xl:pt-[10%] pb-28 pl-[7%] sm:pl-[17%] md:pl-[20%] lg:pl-[38%] xl:pl-[35%]">
            <div className=" w-[90%] sm:w-[80%] md:w-[80%] lg:w-[75%] xl:w-[60%] flex flex-col sm:space-y-4"> 
                <h1 className="sm:text-2xl md:text-3xl">Join Hostel Eats to {accountType==="Customer"?"Order Food":"Sell Food"}</h1>
                <div className="bg-[#31363F] w-[95%] relative top-5 p-1 sm:p-2 rounded-lg sm:rounded-2xl text-sm md:text-base">
                    {accountTypeInfo.map(tab=>(
                    <button key={tab.id} className={`${tab.type===accountType?'bg-[#76ABAE]':''} w-1/2 p-1 sm:p-2 rounded-lg sm:rounded-xl`}
                    onClick={()=>{handleTabClick(tab.type)}}>
                    {tab.name}</button>))}
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="grid grid-cols-2 pt-5 text-sm md:text-base">
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" placeholder="Enter First Name" id="firstName" name="firstName" className={`${inputStyle}`} 
                        {...register('firstName',{required:{value:true,message:"Please Enter Your First Name"}})}/>
                        {errors.firstName && ( <span className="mt-1 text-xs text-red-500">
                            {errors.firstName.message}
                        </span>)}
                    </div>
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" id="lastName" name="lastName"  className={`${inputStyle}`} 
                        {...register('lastName',{required:{value:true,message:"Please Enter Your Last Name"}})}/>
                        {errors.lastName && ( <span className="mt-1 text-xs text-red-500">
                            {errors.lastName.message}
                        </span>)}
                    </div>
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" placeholder="Enter Email Address" id="email" name="email"
                        className={`${inputStyle}`} {...register('email',{required:{value:true,message:"Please Enter Your Email Address"}})}/>
                        {errors.email && ( <span className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </span>)}
                    </div>
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5 relative">
                        <label htmlFor="phone">Phone Number</label>
                        <span className="absolute top-9 md:top-10 left-1.5">+91</span>
                        <input type="text" placeholder="Enter Phone Number" id="phone" name="phone" 
                        className={`${inputStyle} pl-9`} {...register('phone',{required:{value:true,message:"Please Enter Your Phone Number"},
                        minLength:{value:10,message:"Inavlid Phone Number"},maxLength:{value:10,message:"Invalid Phone Number"}})}/>
                        {errors.phone && ( <span className="mt-1 text-xs text-red-500">
                            {errors.phone.message}
                        </span>)}
                    </div>    
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5 relative">
                        <label htmlFor="password">Password</label>
                        <input type={!showPassword?"password":"text"} placeholder="Enter Password" id="password" name="password" className={`${inputStyle}`} 
                        {...register('password',{required:{value:true,message:"Please Enter Your Password"}})}/>
                        <button className="absolute -ml-7 mt-5" type="button" onClick={toggleShowPassword}>{!showPassword?<IoEye/>:<IoEyeOff/>}</button>
                        {errors.password && ( <span className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </span>)}
                    </div>
                    <div className="col-span-full sm:col-span-1 mt-5 sm:mt-5 relative">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type={!showConfirmPassword?"password":"text"} placeholder="Enter Confirm Password" id="confirmPassword" name="confirmPassword" className={`${inputStyle}`} 
                        {...register('confirmPassword',{required:{value:true,message:"Please Enter Confirm Passowrd"}})}/>
                        <button className="absolute -ml-7 mt-5" type="button" onClick={toggleShowConfirmPassword}>{!showConfirmPassword?<IoEye/>:<IoEyeOff/>}</button>
                        {errors.confirmPassword && ( <span className="mt-1 text-xs text-red-500">
                            {errors.confirmPassword.message}
                        </span>)}
                    </div>
                        <button className="col-span-full bg-[#76ABAE] w-[95%] mt-10 rounded-md sm:rounded-lg py-2 text-xs sm:text-base" type="submit">
                            Create Account
                        </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
