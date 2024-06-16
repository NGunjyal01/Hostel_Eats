import axios from 'axios';
import { customerEndpoints } from './apis';
import { GET_POPULAR_DISHES_API } from './apis';

const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

export const searchItem = async (formData) => {
    try {
        const response = await axios.post(customerEndpoints.SEARCH_ITEM_API, formData, config);
        console.log(response);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching search items:", error);
    }
};

export const searchCanteen = async (canteenName) => {
    try {
        const response = await axios.post(customerEndpoints.SEARCH_ITEM_API, canteenName, config);
        console.log("searchCanteenAPI response----->", response);
        return response.data.canteens;
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

export const getCanteenPageDetails = async (id,dispatch) => {
    try {
        const response = await axios.get(customerEndpoints.GET_CANTEEN_PAGE_DETAILS_API,{...config,params:{id:id}});
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching canteen details:", error);
    }
};
