import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const UpdatePassword = () => {


    const [passwords,setPasswords] = useState({curr:'',new:''});
    const [toggleEyeBtn,setToggleEyeBtn] = useState({currEye:false,newEye:false});

    const handlePasswordChange = (input) =>{
        setPasswords({...passwords,[input.name]:input.value});
    }

    const handleToggleEyeBtn = (whichEye)=>{
        setToggleEyeBtn({...toggleEyeBtn,[whichEye]:!toggleEyeBtn[whichEye]});
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
            <h1 className="text-lg">Update Password</h1>
            <div className="mt-10 grid grid-cols-12">
                <div className="col-span-6">
                    <h1 className="pb-2">Current Password</h1>
                    <input type={!toggleEyeBtn.currEye?"password":"text"} placeholder="Enter Current Password" name="curr" value={passwords.curr} 
                    className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2" onChange={(e)=>{handlePasswordChange(e.target)}}/>
                    <button className="absolute -ml-7 mt-5" onClick={()=>{handleToggleEyeBtn("currEye")}}>{!toggleEyeBtn.currEye?<IoEye/>:<IoEyeOff/>}</button>
                </div>
                <div className="col-span-6">
                    <h1 className="pb-2">New Password</h1>
                    <input type={!toggleEyeBtn.newEye?"password":"text"} placeholder="Enter New Password" name="new" value={passwords.new} 
                    className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2" onChange={(e)=>{handlePasswordChange(e.target)}}/>
                    <button className="absolute -ml-7 mt-5" onClick={()=>{handleToggleEyeBtn("newEye")}}>{!toggleEyeBtn.newEye?<IoEye/>:<IoEyeOff/>}</button>
                </div>
            </div>
            <div className="absolute flex space-x-5 right-10 bottom-5">
                <button className="bg-white text-black w-32 rounded-lg py-2">Cancel</button>
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2">Save</button>
            </div>
        </div>
    )
}

export default UpdatePassword
