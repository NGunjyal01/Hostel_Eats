import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateEmail = () => {
    const user = useSelector(store => store.user);
    const [newEmail,setNewEmail] = useState('');
    const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";

    const handleEmailChange = (e)=>{
        setNewEmail(e.target.value);
    }

    const handleSaveBtn = () =>{

    }

    const handleCancelBtn = () =>{
        setNewEmail('');
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
            <h1 className="text-lg">Update Email</h1>
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
            </div>
            <div className="absolute flex space-x-5 right-10 bottom-5">
                {newEmail && <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleCancelBtn}>Cancel</button>}
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2">Save</button>
            </div>
        </div>
    )
}

export default UpdateEmail
