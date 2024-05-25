import axios from "axios";
import toast from "react-hot-toast"
import { endpoints } from "./apis";
import { addUser } from "../slices/userSlice";

const {SIGNUP_API} = endpoints;

export async function signup (signUpData,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(SIGNUP_API,signUpData);
        console.log("SIGNUP API RESPONSE............", response);
        toast.success("Signup Successful");
        dispatch(addUser(signUpData));
        navigate("/");
    }
    catch(error){
        console.log("Error During SignUp: ",error);
        toast.error("Signup Failed");
        navigate("/signup")
    }
    toast.dismiss(toastId);
}