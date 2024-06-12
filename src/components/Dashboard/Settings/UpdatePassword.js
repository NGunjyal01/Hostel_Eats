import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { updatePassword } from "../../../services/settingsAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/authAPI";
import toast from "react-hot-toast";
import ConfirmationalModal from "../../common/ConfirmationalModal";


const UpdatePassword = () => {

    const [toggleEyeBtn,setToggleEyeBtn] = useState({currEye:false,newEye:false});
    const [showCancel,setShowCancel] = useState(false);
    const [showConfirmationalModal,setShowConfirmationalModal] = useState(null);
    const {register,handleSubmit,formState: {errors, dirtyFields},reset} = useForm();
    const changedFieldsLength = Object.keys(dirtyFields).length;
    const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(changedFieldsLength===0){
            setShowCancel(false);
        }
        else if(changedFieldsLength>0){
            setShowCancel(true);
        }
    },[changedFieldsLength])

    const handleToggleEyeBtn = (whichEye)=>{
        setToggleEyeBtn({...toggleEyeBtn,[whichEye]:!toggleEyeBtn[whichEye]});
    }

    const handleOnSubmit = (data) =>{
        if(data.currPass===data.newPass){
            toast.error("Both Passwords Are Same");
        }
        else{
            setShowConfirmationalModal({text1:"Are You Sure?",text2:"Your Password Will Changed & You Have To Again Login",btn1Text:"Change",btn2Text:"Cancel",
                btn1Handler: async ()=>{
                    const result = await updatePassword(data);
                    setShowConfirmationalModal(null); 
                    if(result){
                        logout(navigate,dispatch);
                    }
                },
                btn2Handler: ()=>{setShowConfirmationalModal(null);}
            })
        }
    }

    const handleCancelBtn = () =>{
        reset();
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
            <h1 className="text-lg">Update Password</h1>
            <form onSubmit={handleSubmit(handleOnSubmit)} className="grid grid-cols-12 mt-5">
                <div className="col-span-6 flex flex-col mt-8 relative">
                    <label htmlFor="currPass">Current Password</label>
                    <input type={!toggleEyeBtn.currEye?"password":"text"} placeholder="Enter Current Password" id="currPass" name="currPass" 
                    className={`${inputStyle}`} {...register('currPass',{required:{value:true,message:"Please Enter Your Current Passowrd"}})}/>
                    <button className="absolute right-24 top-11" onClick={()=>{handleToggleEyeBtn("currEye")}}>{!toggleEyeBtn.currEye?<IoEye/>:<IoEyeOff/>}</button>
                    {errors.currPass && ( <span className="mt-1 text-xs text-red-500">
                        {errors.currPass.message}
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8 relative">
                    <label htmlFor="newPass">New Password</label>
                    <input type={!toggleEyeBtn.newEye?"password":"text"} placeholder="Enter New Password" id="newPass" name="newPass"
                    className={`${inputStyle}`} {...register('newPass',{required:{value:true,message:"Please Enter New Password"}})}/>
                    <button className="absolute right-24 top-11" onClick={()=>{handleToggleEyeBtn("newEye")}}>{!toggleEyeBtn.newEye?<IoEye/>:<IoEyeOff/>}</button>
                    {errors.newPass && ( <span className="mt-1 text-xs text-red-500">
                        {errors.newPass.message}
                    </span>)}
                </div>
                <div className="absolute flex space-x-5 right-10 bottom-5">
                    {showCancel && <button className="bg-white text-black w-32 rounded-lg py-2" type="button" onClick={handleCancelBtn}>Cancel</button>}
                    <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                </div>
            </form>
            {showConfirmationalModal && <div className="-ml-[57.3%]"><ConfirmationalModal modalData={showConfirmationalModal}/></div>}
        </div>
    )
}

export default UpdatePassword
