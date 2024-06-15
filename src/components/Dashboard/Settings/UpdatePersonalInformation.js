import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../services/settingsAPI";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const UpdatePersonalInformation = () => {

    const user = useSelector(store => store.user);
    const {firstName,lastName,phone,gender,dob} = user;
    const {register,handleSubmit,formState:{ errors, isDirty, dirtyFields },reset} = useForm();
    const [showCancel,setShowCancel] = useState(false);
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[80%] px-2 py-2 rounded-md mt-2";
    const genders = ["Male","Female","Others"];
    const dispatch = useDispatch();

    useEffect(()=>{
       if(Object.keys(dirtyFields).length>0){
            setShowCancel(true);
       }
    },[Object.keys(dirtyFields).length]);

    const handleOnSubmit = (data) =>{
        if(Object.keys(dirtyFields).length===0){
            return toast.error("No Changes Made");
        }
        else{
            updateProfile(data,dispatch);
        }
    }
    const handleCancelBtn = ()=>{
        setShowCancel(false);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="bg-[#222831] w-[80%] lg:w-[70%] h-fit ml-[10%] lg:ml-[15%] px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
            <h1 className="text-sm sm:text-base lg:text-lg">Update Personal Information</h1>
            <div className="grid grid-cols-12 lg:mt-3 mb-12 text-sm md:text-base">
                <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="Enter First Name" id="firstName"
                    className={`${inputStyle}`} {...register('firstName',{required:true})} defaultValue={firstName}/>
                    {errors.firstName && ( <span className="mt-1 text-xs text-red-500">
                        Please enter your first name.
                    </span>)}
                </div>
                <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" placeholder="Enter Last Name" id="lastName" 
                    className={`${inputStyle}`} {...register('lastName',{required:true})} defaultValue={lastName}/>
                    {errors.lastName && ( <span className="mt-1 text-xs text-red-500">
                        Please enter your last name.
                    </span>)}
                </div>
                <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" name="phone" placeholder="Enter Phone Number" id="phone" 
                    className={`${inputStyle}`} {...register('phone',{required:{value:true, message:"Please enter you Phone Number."},
                    minLength:{value:10,message:"Invalid Phone Number"},maxLength:{value:10,message:"Invalid Phone Number"}})} 
                    defaultValue={phone}/>
                    {errors.phone && ( <span className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                    </span>)}
                </div>
                <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" id="dob" 
                    className={`${inputStyle}`} {...register('dob',{ required: {value: true, message: "Please enter your Date of Birth."},
                    max: {value: new Date().toISOString().split("T")[0],message: "Date of Birth cannot be in the future."}})}
                    defaultValue={dob}/>
                    {errors.dob && ( <span className="mt-1 text-xs text-red-500">
                        {errors.dob.message}
                    </span>)}
                </div>
                <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" className={`${inputStyle}`} {...register('gender',{required:{value:true,message:"Please enter your Gender."}})}
                    defaultValue={gender}>
                        <option value="" selected disabled hidden>Choose here</option> 
                        {genders.map(gender => <option key={gender}>{gender}</option>)}
                    </select>
                    {errors.gender && ( <span className="mt-1 text-xs text-red-500">
                        {errors.gender.message}
                    </span>)}
                </div>
            </div>
            <div className="absolute flex gap-5 right-5 sm:right-10 bottom-4">
                {showCancel && <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 text-xs sm:text-base" type="button" onClick={handleCancelBtn}>Cancel</button>}
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 text-xs sm:text-base" type="submit">Save</button>
            </div>
        </form>
    )
}

export default UpdatePersonalInformation;
