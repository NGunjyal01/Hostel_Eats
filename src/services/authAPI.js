import axios from "axios";
import toast from "react-hot-toast"
import { endpoints } from "./apis";
import { addUser, removeUser } from "../slices/userSlice";
import { resetCartItems } from "../slices/cartSlice";
import { resetFavouriteItems } from "../slices/favouritesSlice";
import { setFavouriteItems } from "../slices/favouritesSlice";
import { loadFavouriteItems } from "./customerAPI";

const { SIGNUP_API,LOGIN_API,FORGOT_PASSWORD_API, VERIFY_OTP_API, RESET_PASSWORD_API,LOGOUT_API } = endpoints;
const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

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

export async function login(formData,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(LOGIN_API,formData,{headers:{'Content-Type':'application/json'},withCredentials:true});
        const favouriteItems = await loadFavouriteItems(dispatch);
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
            dispatch(setFavouriteItems(favouriteItems));
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

export async function forgotPassword(email, navigate) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(FORGOT_PASSWORD_API, { email });
        console.log("FORGOT PASSWORD API RESPONSE............", response);
        if (!response.data.success) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        } else {
            toast.success("OTP Sent to Email");
            navigate('/otp-verification');
        }
    } catch (error) {
        console.error("Error during forgot password: ", error);
        toast.error(error.message || "Error requesting password reset");
    } finally {
        toast.dismiss(toastId);
    }
}

export async function verifyOtp(otpData, navigate) {
    const toastId = toast.loading("Verifying OTP...");
    try {
        const response = await axios.post(VERIFY_OTP_API, otpData);
        console.log("VERIFY OTP API RESPONSE............", response);
        if (!response.data.success) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        } else {
            toast.success("OTP Verified");
            navigate('/reset-password');
        }
    } catch (error) {
        console.error("Error during OTP verification: ", error);
        toast.error(error.message || "OTP Verification Failed");
    } finally {
        toast.dismiss(toastId);
    }
}

export async function resetPassword(resetData, navigate) {
    const toastId = toast.loading("Resetting Password...");
    try {
        const response = await axios.post(RESET_PASSWORD_API, resetData);
        console.log("PASSWORD RESET API RESPONSE............", response);
        if (!response.data.success) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        } else {
            toast.success("Password reset successfully");
            navigate('/login');
        }
    } catch (error) {
        console.error("Error during password reset: ", error);
        toast.error(error.message || "Password reset failed");
    } finally {
        toast.dismiss(toastId);
    }
}

export async function logout(navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(LOGOUT_API,{},config);
        console.log("LOGOUT  API RESPONSE.............",response);
        dispatch(removeUser());
        dispatch(resetCartItems());
        dispatch(resetFavouriteItems());
        localStorage.removeItem("user");
        localStorage.removeItem("canteen");
        localStorage.removeItem("currTab");
        localStorage.removeItem("prevTab");
        localStorage.removeItem('cart');
        localStorage.removeItem('orderHistory');
        localStorage.removeItem('searchInput');
        localStorage.removeItem('orderHistory');
        localStorage.removeItem('filteredDishes');
        localStorage.removeItem('filteredCanteens');
        localStorage.removeItem('favourites');
        localStorage.removeItem('showSearchOptions');
        toast.success("Logged Out");
        navigate('/');
    }
    catch(error){
        console.log("LOGOUT API ERROR.........",error);
    }
    toast.dismiss(toastId);
}
