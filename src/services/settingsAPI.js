import toast from "react-hot-toast";
import { settingsEndpoints } from "./apis";
import axios from "axios";
import { addUser } from "../slices/userSlice";

const { UPDATE_DISPLAY_PICTURE_API } = settingsEndpoints;
const config = {headers:{'Content-Type':'multipart/form-data'},withCredentials:true};

export async function updateProfilePicture(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(UPDATE_DISPLAY_PICTURE_API,formData,config);
        console.log("UPDATE PROFILE PICTURE API RESPONSE.................",response);
        const user = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {...user,imageUrl:response.data.data};
        dispatch(addUser(updatedUser));
        localStorage.setItem('user',JSON.stringify(updatedUser));
        toast.success("Successfully Updated Profile Picture");
        return true;
    }catch(error){
        console.log("ERROR DURING UPDATE PROFILE PICTURE...............",error);
        toast.error("Error Uploading Profile Picture");
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}