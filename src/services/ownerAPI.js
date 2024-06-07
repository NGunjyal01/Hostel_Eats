import toast from "react-hot-toast";
import { ownerEndpoints } from "./apis";
import axios from "axios";
import { setAllCanteen, setCanteenDetails } from "../slices/canteenSlice";

const { CREATE_CANTEEN_API,GET_ALL_CANTEEN_API,GET_CANTEEN_DETAILS_API } = ownerEndpoints;
const config = {headers:{'Content-Type':'application/json'},withCredentials:true};

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

export async function getAllCanteen(dispatch){
    try{
        const response = await axios.get(GET_ALL_CANTEEN_API,config);
        console.log("GET ALL CANTEEN API RESPONSE.......",response);
        const canteen = localStorage.getItem('canteen') ? JSON.parse(localStorage.getItem('canteen')) : {};
        localStorage.setItem('canteen',JSON.stringify({...canteen,allCanteen:response.data.data}));
        dispatch(setAllCanteen(response.data.data));
    }
    catch(error){
        console.log("ERROR DURING GET ALL CANTEEN........",error);
        toast.error("Can't Fetch All Canteen");
    }
}

export async function getCanteenDetails(id,dispatch){
    try{
        const response = await axios.get(GET_CANTEEN_DETAILS_API,{...config,params:{id:id}});
        console.log("GET CANTEEN DETAILS API RESPONSE.........",response);
        const canteen = localStorage.getItem('canteen') ? JSON.parse(localStorage.getItem('canteen')) : {};
        localStorage.setItem('canteen',JSON.stringify({...canteen,canteenDetails:response.data.data}));
        dispatch(setCanteenDetails(response.data.data));
    }
    catch(error){
        console.log("ERROR DURING GET CANTEEN DETAILS..........",error);
        toast.error("Can't Fetch Canteen Details");
    }
}