import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";

const SignUp = () => {


    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const handleFirstNameChange = (input)=>{
        setFirstName(input);
    }
    const handleLastNameChange = (input)=>{
        setLastName(input);
    }
    const handleEmailChange = (input)=>{
        setEmail(input);
    }
    const handlePasswordChange = (input)=>{
        setPassword(input);
    }
    const handleConfirmPasswordChange = (input)=>{
        setConfirmPassword(input);
    }
    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = ()=>{
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white">
            <div className="pt-[10%] ml-[35%] flex flex-col space-y-4"> 
                <h1 className="text-3xl">Join Hostel Eats to Order Food</h1>
                <div className="flex space-x-7 pt-10">
                    <div>
                        <h1 className="pb-2">First Name</h1>
                        <input type="text" placeholder="Enter First Name" value={firstName} className="bg-[#31363F] w-60  px-3 py-4 rounded-lg" onChange={(e)=>{handleFirstNameChange(e.target.value)}}/>
                    </div>
                    <div>
                        <h1 className="pb-2">Last Name</h1>
                        <input type="text" placeholder="Enter Last Name" value={lastName} className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handleLastNameChange(e.target.value)}}/>
                    </div>
                </div>
                <h1>Email Address</h1>
                <input type="text" placeholder="Enter Email Address" value={email} className="bg-[#31363F] w-[51%] px-3 py-4 rounded-lg" onChange={(e)=>{handleEmailChange(e.target.value)}}/>
                <div className="flex space-x-7">
                    <div>
                        <h1 className="pb-2">Password</h1>
                        <input type={!showPassword?"password":"text"} placeholder="Enter Password" value={password} className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handlePasswordChange(e.target.value)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={toggleShowPassword}>{!showPassword?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                    <div>
                        <h1 className="pb-2">Confirm Password</h1>
                        <input type={!showConfirmPassword?"password":"text"} placeholder="Enter Confirm Password" value={confirmPassword} className="bg-[#31363F] w-60 px-3 py-4 rounded-lg" onChange={(e)=>{handleConfirmPasswordChange(e.target.value)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={toggleShowConfirmPassword}>{!showConfirmPassword?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                </div>
                <button className="relative top-7 w-[51%] bg-[#76ABAE] py-3 rounded-lg">Create Account</button>
            </div>
        </div>
    )
}

export default SignUp;
