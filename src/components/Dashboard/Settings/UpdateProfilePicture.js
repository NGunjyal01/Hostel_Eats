import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFileUpload } from "react-icons/md";
import { updateProfilePicture } from "../../../services/settingsAPI";
import toast from "react-hot-toast";

const UpdateProfilePicture = () => {

    const user = useSelector(store => store.user);
    const fileInputRef = useRef(null);
    const [imageFile,setImageFile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isProfilePictureChanged,setIsProfilePictureChanged] = useState(false);
    const dispatch = useDispatch();

    const handleClick = ()=>{
        fileInputRef.current.click();
    }
    const handleFileChange = (e)=>{
        setIsProfilePictureChanged(false);
        setImageFile(e.target.files[0]);
    }
    const handleUpload = async()=>{
        if(!imageFile){
            return toast.error("Select An Image");
        }
        else if(imageFile && !isProfilePictureChanged){
            const formData = {imageFile:imageFile};
            setLoading(true);
            const result = await updateProfilePicture(formData,dispatch);
            if(result){
                setIsProfilePictureChanged(true);
                setLoading(false);
            }
        }
        else{
            return toast.error("Already Updated Profile Picture");
        }
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 mt-10 rounded-xl flex items-center space-x-20 relative">
            <img src={user.imageUrl} className="size-24 rounded-md"/>
            <div className="space-y-7">
                <h1 className="text-">Update Profile Picture</h1>
                <div className="flex gap-5">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/png, image/gif, image/jpeg"/>
                    <button className="bg-white text-black w-32 py-2 rounded-lg" onClick={handleClick}>Select</button>
                    <button className="bg-[#76ABAE] w-32 py-2 rounded-lg" onClick={handleUpload}>
                        {loading ? <span>Uploading...</span> : <span className="flex justify-center items-center gap-1">Upload <MdFileUpload/></span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfilePicture
