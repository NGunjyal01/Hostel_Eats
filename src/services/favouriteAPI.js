import { toggleFavourite } from '../slices/favouritesSlice'; 

export const toggleFavouriteItem = (item, dispatch) => {
    console.log("toggleFavouriteItem called with item:", item);
    dispatch(toggleFavourite(item));
};
