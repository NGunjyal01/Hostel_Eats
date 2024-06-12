import axios from "axios";
import toast from "react-hot-toast"
import { endpoints } from "./apis";
import { addUser, removeUser } from "../slices/userSlice";

const { SIGNUP_API,LOGIN_API } = endpoints;

export async function signup (signUpData,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(SIGNUP_API,signUpData);
        console.log("SIGNUP API RESPONSE............", response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Signup Successful");
            navigate("/login");
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During SignUp: ",error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
    }
    toast.dismiss(toastId);
}

export async function login(email,password,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(LOGIN_API,{email,password},{headers:{'Content-Type':'application/json'},withCredentials:true});
        console.log("LOGIN API RESPONSE..............",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Login Successful");
            const user = response.data.existingUser;
            const dob = response.data.existingUser.dob;
            dispatch(addUser({...user,dob:dob?.split('T')[0]}));
            localStorage.setItem("user",JSON.stringify({...user,dob:dob?.split('T')[0]}));
            navigate('/');
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("Error During Login.................",error);
            toast.error("Login Failed");
            navigate('/login');
        }
    }
    toast.dismiss(toastId);
}

export function logout(navigate,dispatch){
    dispatch(removeUser());
    localStorage.removeItem("user");
    localStorage.removeItem("canteen");
    localStorage.removeItem("currTab");
    localStorage.removeItem("prevTab");
    toast.success("Logged Out");
    navigate('/');
}