import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";

const LogIn = () => {

    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);

    const handleEmailChange = (input) =>{
        setEmail(input);
    };
    const handlePasswordChange = (input)=>{
        setPassword(input);
    };

    const handleEyeBtnClick = ()=>{
        setShowPassword(!showPassword);
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white">
            <div className="pt-[10%] ml-[35%] flex flex-col space-y-4">
                <h1 className="text-4xl">Welcome Back</h1>
                <h1 className="pt-10">Email Address</h1>
                <input type="text" placeholder="Enter Email Address" value={email} className="bg-[#31363F] w-[40%] px-3 py-4 rounded-lg" onChange={(e)=>{handleEmailChange(e.target.value)}}/>
                <h1 className="pt-5">Password</h1>
                <input type={!showPassword?"password":"text"} placeholder="Enter Password" value={password} className="bg-[#31363F] w-[40%] px-3 py-4 rounded-lg" onChange={(e)=>{handlePasswordChange(e.target.value)}}/>
                <button className="relative -top-[3.2rem] ml-[37%]" onClick={handleEyeBtnClick}>{!showPassword?<IoEye/>:<IoEyeOff/>}</button>
                <button className="relative -top-10 ml-[29%] w-fit text-sm">Forget Password</button>
                <button className="bg-[#76ABAE] w-[40%] py-3 rounded-lg">LogIn</button>
            </div>
        </div>
    )   
}

export default LogIn;
