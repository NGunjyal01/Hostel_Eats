import toast from "react-hot-toast";
import { ownerEndpoints } from "./apis";
import axios from "axios";
import { setAllCanteen, setCanteenDetails } from "../slices/canteenSlice";
import { setOrderHistory } from "../slices/orderHistorySlice";
import { setLiveOrders } from "../slices/notificationSlice";

const { CREATE_CANTEEN_API,GET_ALL_CANTEEN_API,GET_CANTEEN_DETAILS_API,CREATE_ITEM_API,EDIT_CANTEEN_API,
EDIT_ITEM_API,DELETE_CANTEEN_API,DELETE_ITEM_API,GET_ORDER_HISTROY_API,UPDATE_ORDER_STATUS,GET_LIVE_ORDERS_API,
REJECT_ORDER_API } = ownerEndpoints;
const config = {headers:{'Content-Type':'multipart/form-data'},withCredentials:true};

export async function createCanteen(formData,navigate){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(CREATE_CANTEEN_API,formData);
        console.log("CREATE CANTEEN API RESPONSE........",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            toast.success("Canteen Created");
            navigate(`/dashboard/edit_canteen/${response.data.data._id}?scrollToMenu=true`);
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING CREATE CANTEEN......",error);
            toast.error("Try Again");
        }
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
        return true;
    }
    catch(error){
        console.log("ERROR DURING GET CANTEEN DETAILS..........",error);
        toast.error("Can't Fetch Canteen Details");
        return false;
    }
}

export async function addItem(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(CREATE_ITEM_API,formData,config);
        console.log("CREATE ITEM API RESPONSE..........",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError"
            throw error;
        }
        else{
            dispatch(setCanteenDetails(response.data.data));
            const canteen = localStorage.getItem('canteen') ? JSON.parse(localStorage.getItem('canteen')) : {};
            localStorage.setItem('canteen',JSON.stringify({...canteen,canteenDetails:response.data.data}));
            toast.success("Successfully Add Item");
            return true;
        }
    }
    catch(error){
        if(error.code === "CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING CREATE ITEM RESPONSE........",error);
            toast.error("Error During Create Item"); 
        }
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function editCanteenDetails(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(EDIT_CANTEEN_API,formData,config);
        console.log("EDIT CANTEEN API RESPONSE.........",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            dispatch(setCanteenDetails(response.data.data));
            const canteen = localStorage.getItem('canteen') ? JSON.parse(localStorage.getItem('canteen')) : {};
            localStorage.setItem('canteen',JSON.stringify({...canteen,canteenDetails:response.data.data}));
            toast.success("Successfully Edit Canteen Details");
            return true;
        }
    }
    catch(error){
        if(error.code==="CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING EDIT CANTEEN DETAILS RESPONSE.........",error);
            toast.error("Error During Edit Canteen Details");
        }
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function editItem(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(EDIT_ITEM_API,formData,config);
        console.log("EDIT ITEM API RESPONSE................",response);
        if(!response.data.success){
            const error = new Error(response.data.message);
            error.code = "CustomError";
            throw error;
        }
        else{
            const canteen = JSON.parse(localStorage.getItem('canteen'));
            const canteenDetails = canteen.canteenDetails;
            const menuItems = canteenDetails.menuitems;
            const updatedMenuItems = menuItems.map(item => item._id===response.data.data._id ? {...item,...response.data.data} : item);
            const updatedCanteenDetails = {...canteenDetails,menuitems:updatedMenuItems};
            dispatch(setCanteenDetails(updatedCanteenDetails));
            localStorage.setItem("canteen",JSON.stringify({...canteen,canteenDetails:updatedCanteenDetails}));
            toast.success("Successfully Edit Item");
            return true;
        }
    }
    catch(error){
        if(error.code = "CustomError"){
            toast.error(error.message);
        }
        else{
            console.log("ERROR DURING EDIT ITEM API RESPONSE...............",error);
            toast.error("Error During Edit Item");
        }
        return false;
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function deleteItem(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(DELETE_ITEM_API,formData,config);
        console.log("DELETE ITEM API RESPONSE................",response);
        const canteen = JSON.parse(localStorage.getItem('canteen'));
        const canteenDetails = canteen.canteenDetails;
        const updatedCanteenDetails = {...canteenDetails,menuitems:response.data.data};
        dispatch(setCanteenDetails(updatedCanteenDetails));
        localStorage.setItem("canteen",JSON.stringify({...canteen,canteenDetails:updatedCanteenDetails}));
        toast.success("Successfully Deleted Item");

    }catch(error){
        console.log("ERROR DURING DELETE ITEM API.................",error);
        toast.error("Error During Deleting Item");
    }
    toast.dismiss(toastId);
}

export async function deleteCanteen(formData,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const response = await axios.post(DELETE_CANTEEN_API,formData,config);
        console.log("DELETE CANTEEN API RESPONSE...................",response);
        const canteen = JSON.parse(localStorage.getItem('canteen'));
        localStorage.setItem('canteen',JSON.stringify({...canteen,allCanteen:response.data.data}));
        dispatch(setAllCanteen(response.data.data));
        toast.success("Successfully Deleted Canteen")
    }
    catch(error){
        console.log("ERROR DURING DELETE CANTEEN API.................",error);
        toast.error("Error During Deleting Canteen");
    }
    toast.dismiss(toastId);
}

export async function getOrderHistory(shopid,dispatch){
    try{
        const response = await axios.post(GET_ORDER_HISTROY_API,shopid,config);
        console.log("ORDER HISTORY API RESPONSE...................",response);
        dispatch(setOrderHistory(response.data.data));
        localStorage.setItem('orderHistory',JSON.stringify(response.data.data));
        return true;
    }
    catch(error){
        console.log("ERROR DURING ORDER HISTORY API RESPONSE................",error);
        return false;
    }
}

export async function updateOrderStatus(formData){
    try{
        const response = await axios.post(UPDATE_ORDER_STATUS,formData,config);
        console.log("UPDATE ORDER STATUS API RESPONSE..................",response);
    }
    catch(error){
        console.log("UPDATE ORDER STATUS API ERROR..................",error);
    }
}

export async function getLiveOrders(dispatch){
    try{
        const response = await axios.get(GET_LIVE_ORDERS_API,config);
        console.log("GET LIVE ORDERS API RESPONSE................",response);
        dispatch(setLiveOrders(response.data.data));
    }
    catch(error){
        console.log("LIVE ORDER API ERROR",error);
    }
}

export async function rejectOrder(formData){
    try{
        const resposne = await axios.post(REJECT_ORDER_API,formData,config);
        console.log("REJECT ORDER API RESPONSE..................",resposne);
    }
    catch(error){
        console.log("REJCET ORDER API ERROR...................",error);
    }
}