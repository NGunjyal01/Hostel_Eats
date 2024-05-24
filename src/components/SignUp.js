import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";

const SignUp = () => {

    const [formData,setFormData] = useState({firstName:'',lastName:'',email:'',password:'',confirmPassword:''});

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [accountType,setAccountType] = useState("Customer");

    const handleOnChange = (input) =>{
        setFormData({...formData,[input.name]:input.value});
        console.log(formData)
    };
    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = ()=>{
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleTabClick = (type)=>{
        setAccountType(type);
    }

    const handleSubmitBtn = ()=>{
        const signUpData = {...formData,accountType:accountType};
        console.log(signUpData);
    }

    const accountTypeInfo = [{id:1,name:"Customer",type:"Customer"},
                            {id:2,name:"Owner",type:"Owner"}];

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white">
            <div className="pt-[8%] ml-[35%] flex flex-col space-y-4"> 
                <h1 className="text-3xl">Join Hostel Eats to {accountType==="Customer"?"Order Food":"Sell Food"}</h1>
                <div className="bg-[#31363F] w-[51%] relative top-5 p-2 rounded-2xl">
                    {accountTypeInfo.map(tab=>(
                    <button key={tab.id} className={`${tab.type===accountType?'bg-[#76ABAE]':''} w-1/2 py-2 rounded-xl`}
                    onClick={()=>{handleTabClick(tab.type)}}>
                    {tab.name}</button>))}
                </div>
                <div className="flex space-x-7 pt-7">
                    <div>
                        <h1 className="pb-2">First Name</h1>
                        <input type="text" placeholder="Enter First Name" name="firstName" value={formData.firstName} 
                        className="bg-[#31363F] w-60  px-3 py-4 rounded-lg" onChange={(e)=>{handleOnChange(e.target)}}/>
                    </div>
                    <div>
                        <h1 className="pb-2">Last Name</h1>
                        <input type="text" placeholder="Enter Last Name" name="lastName" value={formData.lastName} 
                        className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handleOnChange(e.target)}}/>
                    </div>
                </div>
                <h1>Email Address</h1>
                <input type="text" placeholder="Enter Email Address" name="email" value={formData.email} 
                className="bg-[#31363F] w-[51%] px-3 py-4 rounded-lg" onChange={(e)=>{handleOnChange(e.target)}}/>
                <div className="flex space-x-7">
                    <div>
                        <h1 className="pb-2">Password</h1>
                        <input type={!showPassword?"password":"text"} placeholder="Enter Password" name="password" value={formData.password} 
                        className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handleOnChange(e.target)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={toggleShowPassword}>{!showPassword?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                    <div>
                        <h1 className="pb-2">Confirm Password</h1>
                        <input type={!showConfirmPassword?"password":"text"} placeholder="Enter Confirm Password" name="confirmPassword" value={formData.confirmPassword} 
                        className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handleOnChange(e.target)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={toggleShowConfirmPassword}>{!showConfirmPassword?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                </div>
                <button className="relative top-7 w-[51%] bg-[#76ABAE] py-3 rounded-lg"
                onClick={handleSubmitBtn}>Create Account</button>
            </div>
        </div>
    )
}

export default SignUp;
