import axios from 'axios';
import { customerEndpoints } from './apis';
import { GET_POPULAR_DISHES_API } from './apis';
import toast from 'react-hot-toast';
import { resetCartItems, setCartItem } from '../slices/cartSlice';

const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

const { GET_CART_ITEMS_API, ADD_CART_ITEM_API, REMOVE_CART_ITEM_API } = customerEndpoints;

export const searchItem = async (formData) => {
    try {
        const response = await axios.post(customerEndpoints.SEARCH_ITEM_API, formData, config);
        console.log("Search Item response====>", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching search items:", error);
    }
};

export const getPopularDishes = async () => {
    try {
        const response = await axios.get(GET_POPULAR_DISHES_API, config);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular dishes:", error);
    }
};

export const getCanteenPageDetails = async (id, dispatch) => {
    try {
        const response = await axios.get(customerEndpoints.GET_CANTEEN_PAGE_DETAILS_API, { ...config, params: { id: id } });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching canteen details:", error);
    }
};

export async function addCartItem(item, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(ADD_CART_ITEM_API, item, config);
        console.log("ADD CART ITEM API RESPONSE:", response);
        localStorage.setItem('cart',JSON.stringify(response.data.data));
        dispatch(setCartItem(response.data.data));
        toast.success("Successfully Added Item");
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
        } else if (error.request) {
            console.error("No response received:", error.request);
            toast.error("Error: No response from server");
        } else {
            console.error("Error setting up request:", error.message);
            toast.error(`Error: ${error.message}`);
        }
    }
    toast.dismiss(toastId);
}

export async function removeCartItem(item, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(REMOVE_CART_ITEM_API, item, config);
        console.log("REMOVE CART ITEM API RESPONSE...................", response);
        dispatch(setCartItem(response.data.data));
        localStorage.setItem('cart',JSON.stringify(response.data.data));
        toast.success("Successfully Removed Item");
    } catch (error) {
        console.log("ERROR DURING REMOVE CART ITEM API....................", error);
        toast.error("Error During Remove Cart Item");
    }
    toast.dismiss(toastId);
}

export async function getCartItems(dispatch) {
    try {
        const response = await axios.get(GET_CART_ITEMS_API, config);
        console.log("GET CART ITEMS API RESPONSE................", response);
        if (!response.data.success) {
            localStorage.setItem('cart', JSON.stringify(null));
            dispatch(resetCartItems());
        } 
        else {
            localStorage.setItem('cart', JSON.stringify(response.data.data));
            dispatch(setCartItem(response.data.data));
        }
    } catch (error) {
        console.log("ERROR DURING GET CART ITEMS API.................", error);
        toast.error("Error During Get Cart Items");
    }
}

export const resetCartItem = async () => {
    try {
        const response = await axios.get(customerEndpoints.RESET_CART_ITEM_API, config);
        console.log("Reset Cart Items API Response====>", response);
        toast.success("Cart Reset Successfully");
        return true;
    } catch (error) {
        console.error("Error resetting cart items:", error);
        toast.error("Error During Reset Cart Item");
        return false;
    }
};

export const searchItemByCanteen = async (formData) => {
    try {
        const response = await axios.post(customerEndpoints.SEARCH_ITEM_BY_CANTEEN_API, formData, config);
        console.log("Search Item By Canteen API response====>", response);
        return response.data;
    } catch (error) {
        console.log("Error searching for items:", error);
    }
}
