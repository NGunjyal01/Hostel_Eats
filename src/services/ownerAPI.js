import toast from "react-hot-toast";
import { ownerEndpoints } from "./apis";
import axios from "axios";

const { CREATE_CANTEEN_API,GET_ALL_CANTEEN_API } = ownerEndpoints;

export async function createCanteen(formData,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(CREATE_CANTEEN_API,formData);
        console.log("CREATE CANTEEN API RESPONSE........",response);
        toast.success("Canteen Created");
        navigate("/dashboard/edit_canteen");
    }
    catch(error){
        console.log("ERROR DURING CREATE CANTEEN......",error);
        toast.error("Try Again");
    }
    toast.dismiss(toastId);
}

export async function getAllCanteenAPI(){
    try{
        const response = await axios.get(GET_ALL_CANTEEN_API,{headers:{'Content-Type':'application/json'},withCredentials:true});
        console.log("GET ALL CANTEEN API RESPONSE.......",response);
        const canteen = localStorage.getItem('canteen') ? JSON.parse(localStorage.getItem('canteen')) : {};
        localStorage.setItem('canteen',JSON.stringify({...canteen,allCanteen:response.data.data}));
    }
    catch(error){
        console.log("ERROR DURING GET ALL CANTEEN........",error);
        toast.error("Can't Fetch All Canteen");
    }

}