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
            console.log(imageFile)
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
        <div className="bg-[#222831] w-[85%] lg:w-[70%] h-fit px-3 sm:px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-6 sm:mt-10 rounded-md sm:rounded-lg md:rounded-xl flex items-center gap-5 sm:gap-7 md:gap-16 xl:gap-20 relative">
            <h1 className="absolute -mt-[57%] sm:-mt-[49%] md:-mt-[43%] lg:-mt-[37%] xl:-mt-[30%] -ml-2 sm:-ml-3 md:-ml-5 lg:-ml-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Edit Profile</h1>
            <img src={imageFile ? URL.createObjectURL(imageFile) :user.imageUrl} className="size-16 md:size-20 rounded-lg"/>
            <div className="space-y-3 sm:space-y-5 md:space-y-7">
                <h1 className="text-xs sm:text-sm lg:text-base">Update Profile Picture</h1>
                <div className="flex gap-1.5 sm:gap-5">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/png, image/gif, image/jpeg"/>
                    <button className="bg-white text-black w-16 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 text-[0.65rem] sm:text-base" onClick={handleClick}>Select</button>
                    <button className="bg-[#76ABAE] w-16 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 text-[0.65rem] sm:text-base" onClick={handleUpload}>
                        {loading ? <span>Uploading...</span> : <span className="flex justify-center items-center gap-1">Upload <MdFileUpload/></span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfilePicture
