import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../../services/settingsAPI";
import ConfirmationalModal from "../../common/ConfirmationalModal";
import toast from "react-hot-toast";
import { logout } from "../../../services/authAPI";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {

    const user = useSelector(store => store.user);
    const [newEmail,setNewEmail] = useState('');
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[80%] px-2 py-2 rounded-md mt-2";
    const [showConfirmationalModal,setShowConfirmationalModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEmailChange = (e)=>{
        setNewEmail(e.target.value);
    }

    const handleSaveBtn = () =>{
        if(newEmail===''){
            toast.error("Enter New Email");
        }
        else{
            const formData = {currEmail:user.email,newEmail:newEmail};
            setShowConfirmationalModal({text1:"Are You Sure?",text2:"Your Email Will Changed & You Have To Again Login",btn1Text:"Change",btn2Text:"Cancel",
                btn1Handler: ()=>{updateEmail(formData);setShowConfirmationalModal(null); logout(navigate,dispatch);},
                btn2Handler: ()=>{setShowConfirmationalModal(null);}
            })
        }
    }

    const handleCancelBtn = () =>{
        setNewEmail('');
    }

    return (
        <div className="bg-[#222831] w-[85%] lg:w-[70%] h-fit px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
            <h1 className="text-base lg:text-lg">Update Email</h1>
            <div className="grid grid-cols-12 lg:mt-5 mb-16 text-sm md:text-base">
                <div className="col-span-full md:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="currEmail">Current Email</label>
                    <input type="email" id="currEmail" value={user.email} className={`${inputStyle}`} disabled={true}/>
                </div>
                <div className="col-span-full md:col-span-6 flex flex-col mt-5 sm:mt-8">
                    <label htmlFor="newEmail">New Email</label>
                    <input type="email" id="newEmail" name="new" placeholder="Enter New Email"  value={newEmail} onChange={handleEmailChange}
                    className={`${inputStyle}`}/>
                </div>
            </div>
            <div className="absolute flex gap-5 right-5 sm:right-10 bottom-5">
                {newEmail && <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 text-xs sm:text-base" onClick={handleCancelBtn}>Cancel</button>}
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md md:rounded-lg py-1 md:py-2 text-xs sm:text-base" onClick={handleSaveBtn}>Save</button>
            </div>
            {showConfirmationalModal && <ConfirmationalModal modalData={showConfirmationalModal}/>}
        </div>
    )
}

export default UpdateEmail;
