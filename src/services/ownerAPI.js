import toast from "react-hot-toast";
import { ownerEndpoints } from "./apis";
import axios from "axios";

const { CREATE_CANTEEN_API } = ownerEndpoints;

export async function createCanteen(formData,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(CREATE_CANTEEN_API,formData);
        console.log("CREATE CANTEEN API RESPONSE........",response);
        toast.success("Canteen Created");
        navigate("/dashboard/edit_canteen")
    }
    catch(error){
        console.log("ERROR DURING CREATE CANTEEN......",error);
        toast.error("Try Again");
    }
    toast.dismiss(toastId);
}