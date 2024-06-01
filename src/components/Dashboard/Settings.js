import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux"


const Settings = () => {

    const user = useSelector(store => store.user);
    const {firstName,lastName,phone,email,gender,dob} = user;
    const [personalInfo,setPersonalInfo] = useState({firstName:firstName,lastName:lastName,phone:phone,email:email,gender:gender,dob:dob});
    const [passwords,setPasswords] = useState({curr:'',new:''});
    const [toggleEyeBtn,setToggleEyeBtn] = useState({currEye:false,newEye:false});

    const inputPeronalInfo = [{type:"text",name:"firstName",heading:"First Name",placeholder:"Enter First Name",value:personalInfo.firstName},
        {type:"text",name:"lastName",heading:"Last Name",placeholder:"Enter Last Name",value:personalInfo.lastName},
        {type:"text",name:"email",heading:"Email Address",placeholder:"Enter Email Address",value:personalInfo.email},
        {type:"text",name:"phone",heading:"Phone Number",placeholder:"Enter Phone Number",value:personalInfo.phone},
        {type:"date",name:"dob",heading:"Date of Birth",placeholder:"Enter DOB",value:personalInfo.dob},
    ]

    const handleOnChange = (input) =>{
        setPersonalInfo({...personalInfo,[input.name]:input.value});
        console.log(personalInfo);
    }

    const handlePasswordChange = (input) =>{
        setPasswords({...passwords,[input.name]:input.value});
    }

    const handleToggleEyeBtn = (whichEye)=>{
        setToggleEyeBtn({...toggleEyeBtn,[whichEye]:!toggleEyeBtn[whichEye]});
    }

    return (
        <div className="flex flex-col items-center relative">
            <h1 className="-translate-x-[23rem] text-3xl font-semibold">Edit Profile</h1>
            <div className="bg-[#222831] w-[70%] h-fit p-10 mt-10 rounded-xl flex items-center space-x-20 relative">
                <img src={user.imageUrl} className="size-24 rounded-md"/>
                <div className="space-y-7">
                    <h1 className="text-">Update Profile Picture</h1>
                    <div className="flex space-x-10">
                        <button className="bg-[#31363F] w-32 py-2 rounded-lg">Select</button>
                        <button className="bg-[#76ABAE] w-32 py-2 rounded-lg">Upload</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
                <h1 className="text-lg">Update Personal Information</h1>
                <div className="grid grid-cols-12">
                    {inputPeronalInfo.map(info => <div key={info.name} className="col-span-6 mt-7">
                        <h1>{info.heading}</h1>
                        <input type={info.type} name={info.name} placeholder={info.placeholder} value={personalInfo[info.name]} 
                        className="bg-[#31363F] w-60 px-2 py-2 rounded-md mt-2" onChange={(e)=>handleOnChange(e.target)}/>
                    </div>)}
                    <div className="col-span-6 mt-7">
                        <h1>Gender</h1>
                        <select className="bg-[#31363F] w-60 px-2 py-2 rounded-md mt-2" onChange={(e)=>console.log(e.target.value)}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </select>
                    </div>
                </div>
                <div className="absolute flex space-x-5 right-10 bottom-5">
                    <button className="bg-white text-black w-32 rounded-lg py-2">Cancel</button>
                    <button className="bg-[#76ABAE] w-32 rounded-lg py-2">Save</button>
                </div>
            </div>
            <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
                <h1 className="text-lg">Update Password</h1>
                <div className="mt-10 grid grid-cols-12">
                    <div className="col-span-6">
                        <h1 className="pb-2">Current Password</h1>
                        <input type={!toggleEyeBtn.currEye?"password":"text"} placeholder="Enter Current Password" name="curr" value={passwords.curr} 
                        className="bg-[#31363F] w-60 px-2 py-2 rounded-md mt-2" onChange={(e)=>{handlePasswordChange(e.target)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={()=>{handleToggleEyeBtn("currEye")}}>{!toggleEyeBtn.currEye?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                    <div className="col-span-6">
                        <h1 className="pb-2">New Password</h1>
                        <input type={!toggleEyeBtn.newEye?"password":"text"} placeholder="Enter New Password" name="new" value={passwords.new} 
                        className="bg-[#31363F] w-60 px-2 py-2 rounded-md mt-2" onChange={(e)=>{handlePasswordChange(e.target)}}/>
                        <button className="absolute -ml-7 mt-5" onClick={()=>{handleToggleEyeBtn("newEye")}}>{!toggleEyeBtn.newEye?<IoEye/>:<IoEyeOff/>}</button>
                    </div>
                </div>
                <div className="absolute flex space-x-5 right-10 bottom-5">
                    <button className="bg-white text-black w-32 rounded-lg py-2">Cancel</button>
                    <button className="bg-[#76ABAE] w-32 rounded-lg py-2">Save</button>
                </div>
            </div>
        </div>
    )
}

export default Settings
