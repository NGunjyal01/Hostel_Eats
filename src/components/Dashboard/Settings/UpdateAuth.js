import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux";

const UpdatePassword = () => {

    const user = useSelector(store => store.user);
    const [passwords,setPasswords] = useState({curr:'',new:''});
    const [newEmail,setNewEmail] = useState('');
    const [toggleEyeBtn,setToggleEyeBtn] = useState({currEye:false,newEye:false});
    const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";

    const handlePasswordChange = (input) =>{
        setPasswords({...passwords,[input.name]:input.value});
    }

    const handleToggleEyeBtn = (whichEye)=>{
        setToggleEyeBtn({...toggleEyeBtn,[whichEye]:!toggleEyeBtn[whichEye]});
    }
    const handleEmailChange = (e)=>{
        setNewEmail(e.target.value);
    }

    const handleSaveBtn = () =>{

    }

    const handleCancelBtn = () =>{
        setPasswords({curr:'',new:''});
        setNewEmail('');
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
            <h1 className="text-lg">Update Authentication</h1>
            <div className="grid grid-cols-12 mt-5">
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="currEmail">Current Email</label>
                    <input type="email" id="currEmail" value={user.email} className={`${inputStyle}`} disabled={true}/>
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="newEmail">New Email</label>
                    <input type="email" id="newEmail" name="new" placeholder="Enter New Email"  value={newEmail} onChange={handleEmailChange}
                    className={`${inputStyle}`}/>
                </div>
                <div className="col-span-6 flex flex-col mt-8 relative">
                    <label htmlFor="currPassword" className="pb-2">Current Password</label>
                    <input type={!toggleEyeBtn.currEye?"password":"text"} placeholder="Enter Current Password" id="currPassword" name="curr" value={passwords.curr} 
                    className={`${inputStyle}`} onChange={(e)=>{handlePasswordChange(e.target)}}/>
                    <button className="absolute right-24 bottom-3" onClick={()=>{handleToggleEyeBtn("currEye")}}>{!toggleEyeBtn.currEye?<IoEye/>:<IoEyeOff/>}</button>
                </div>
                <div className="col-span-6 flex flex-col mt-8 relative">
                    <label htmlFor="newPassword">New Password</label>
                    <input type={!toggleEyeBtn.newEye?"password":"text"} placeholder="Enter New Password" id="newPassword" name="new" value={passwords.new} 
                    className={`${inputStyle}`} onChange={(e)=>{handlePasswordChange(e.target)}}/>
                    <button className="absolute right-24 bottom-5" onClick={()=>{handleToggleEyeBtn("newEye")}}>{!toggleEyeBtn.newEye?<IoEye/>:<IoEyeOff/>}</button>
                </div>
            </div>
            <div className="absolute flex space-x-5 right-10 bottom-5">
                <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleCancelBtn}>Cancel</button>
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2">Save</button>
            </div>
        </div>
    )
}

export default UpdatePassword
