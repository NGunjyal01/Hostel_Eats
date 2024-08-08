import toast from "react-hot-toast";
import { settingsEndpoints } from "./apis";
import axios from "axios";
import { addUser } from "../slices/userSlice";

const { UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,UPDATE_EMAIL_API,UPDATE_PASSWORD_API } = settingsEndpoints;
const config = {headers:{'Content-Type':'multipart/form-data'},withCredentials:true};

export async function updateProfilePicture(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(UPDATE_DISPLAY_PICTURE_API,formData,config);
        console.log("UPDATE PROFILE PICTURE API RESPONSE.................",response);
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            const user = JSON.parse(localStorage.getItem('user'));
            const updatedUser = {...user,imageUrl:response.data.data};
            dispatch(addUser(updatedUser));
            localStorage.setItem('user',JSON.stringify(updatedUser));
            toast.success("Successfully Updated Profile Picture");
        }
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

export async function updateProfile(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(UPDATE_PROFILE_API,formData,config);
        console.log("UPDATE PROFILE API RESPONSE..................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Successfully Updated Profile Information");
            const user = response.data.data;
            dispatch(addUser({...user,dob:response.data.data.dob.split('T')[0]}));
            localStorage.setItem('user',JSON.stringify({...user,dob:response.data.data.dob.split('T')[0]}));
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING UPDATE PROFILE API...................",error);
            toast.error("Error During Update Profile");
        }
    }
    toast.dismiss(toastId);
}

export async function updateEmail(formData){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(UPDATE_EMAIL_API,formData,config);
        console.log("UPDATE EMAIL API RESPONSE................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Sucessfully Updated Email");
            return true;
        }
    }
    catch(error){
        if(error.code === "CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING UPDATE EMAIL API................",error);
            toast.error("Error Duringg Update Email");
        }
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function updatePassword(formData){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(UPDATE_PASSWORD_API,formData,config);
        console.log("UPDATE PASSWORD API RESPONSE................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Sucessfully Updated Password");
            return true;
        }
    }
    catch(error){
        if(error.code === "CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING UPDATE PASSWORD API................",error);
            toast.error("Error Duringg Update Password");
        }
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}