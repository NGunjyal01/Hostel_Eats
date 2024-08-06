import axios from 'axios';
import { customerEndpoints } from './apis';
import { GET_POPULAR_DISHES_API , GET_POPULAR_CANTEENS_API } from './apis';
import toast from 'react-hot-toast';
import { resetCartItems, setCartItem } from '../slices/cartSlice';
import {setFavouriteItems, resetFavouriteItems} from '../slices/favouritesSlice'
import { setOrderHistory } from '../slices/orderHistorySlice';
import { setPopularDishes } from '../slices/popularDishesSlice';

const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

const { GET_CART_ITEMS_API, ADD_CART_ITEM_API, REMOVE_CART_ITEM_API,GET_ORDER_HISTROY_API } = customerEndpoints;

export const searchItem = async (formData) => {
    try {
        const response = await axios.post(customerEndpoints.SEARCH_ITEM_API, formData, config);
        console.log("Search Item response====>", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching search items:", error);
    }
};

export const getPopularDishes = async (dispatch) => {
    try {
        const response = await axios.get(GET_POPULAR_DISHES_API, config);
        console.log("pop dishes=>",response.data.data);
        localStorage.setItem('popularDishes',JSON.stringify(response.data.data));
        dispatch(setPopularDishes(response.data.data)); 
        return response.data.data;
    } catch (error) {
        console.error("Error fetching popular dishes:", error);
    }
};

export const getPopularCanteens = async () => {
    try {
        const response = await axios.get(GET_POPULAR_CANTEENS_API, config);
        console.log("pop cans=>",response.data.data); 
        return response.data.data;
    } catch (error) {
        console.error("Error fetching popular canteens:", error);
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
        if(response.data.success){
        localStorage.setItem('cart',JSON.stringify(response.data.data));
        dispatch(setCartItem(response.data.data));
        toast.success("Successfully Added Item");
        }else{
            toast.error("Kindly login first.");
        }
    } catch (error) {
        console.log("ERROR DURING ADD CART ITEM API................",error);
        toast.error("Error Adding Item");
    }
    toast.dismiss(toastId);
}

export async function removeCartItem(item, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(REMOVE_CART_ITEM_API, item, config);
        console.log("REMOVE CART ITEM API RESPONSE...................", response);
        if(response.data.success){
        if(response.data.message==="Cart is now empty and has been deleted"){
            dispatch(resetCartItems());
            localStorage.removeItem('cart');
        }
        else{
            dispatch(setCartItem(response.data.data));
            localStorage.setItem('cart',JSON.stringify(response.data.data));
        }
        toast.success("Successfully Removed Item");
        }else{
            toast.error("Error Removing Item without logging in.");
        }
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

export const addFavouriteItem = async (item, dispatch) => {
    try {
        const response = await axios.post(customerEndpoints.ADD_FAVOURITE_ITEM_API, item, config);
        console.log("ADD FAVOURITE ITEM API RESPONSE:", response);
        if(response.data.success){
        localStorage.setItem('favourites',JSON.stringify(response.data.data))
        dispatch(setFavouriteItems(response.data.data))
        toast.success("Successfully Added to Favourites");
        }else{
            toast.error("Kindly login first.");
        }
    } catch (error) {
        console.log("ERROR DURING ADD FAVOURITE ITEM API................", error);
        toast.error("Error Adding to Favourites");
    }
}

export const removeFavouriteItem = async (item, dispatch) => {
    try {
        const response = await axios.post(customerEndpoints.REMOVE_FAVOURITE_ITEM_API, item, config);
        console.log("REMOVE FAVOURITE ITEM API RESPONSE...................", response);
        if(response.data.success){
        if(response.data.message==="Favourite List is now empty and has been deleted"){
            dispatch(resetFavouriteItems());
            localStorage.removeItem('favourites');
        } else {
            dispatch(setFavouriteItems(response.data.data));
            localStorage.setItem('favourites', JSON.stringify(response.data.data));
        } 
        toast.success("Successfully Removed from Favourites");
        }else{
            toast.error("Error removing favourites without logging in.")
        }
    } catch (error) {
        console.log("ERROR DURING REMOVE FAVOURITE ITEM API....................", error);
        toast.error("Error Removing from Favourites");
    }
}


export const loadFavouriteItems = async (dispatch) => {
    try {
        const response = await axios.get(customerEndpoints.GET_FAVOURITE_ITEMS_API, config);
        console.log("GET FAVOURITE ITEMS API RESPONSE:", response);
        if (response.data.success) {
            const favouriteItems = response.data.data;
            localStorage.setItem('favourites', JSON.stringify(favouriteItems));
            dispatch(setFavouriteItems(favouriteItems));
        } else {
            localStorage.setItem('favourites', JSON.stringify([]));
            dispatch(setFavouriteItems([]));
        }
    } catch (error) {
        console.error("Error loading favourite items:", error);
        toast.error("Error loading favourite items");
    }
};

export async function getOrderHistory(dispatch){
    try{
        const response = await axios.get(GET_ORDER_HISTROY_API,config);
        console.log("GET ORDER HISTORY API RESPONSE.......................",response);
        const orders = response.data.data || [];
        dispatch(setOrderHistory(orders));
        localStorage.setItem('orderHistory',JSON.stringify(orders));
        return orders;
    }
    catch(error){
        console.log("ERROR DURING GET ORDEER HISTORY API.....................",error);
        return null;
    }
}