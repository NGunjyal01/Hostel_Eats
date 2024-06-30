import { addFavouriteItem, removeFavouriteItem } from './customerAPI';

export const toggleFavouriteItem = async (item, dispatch, currentFavourites) => {
    const isFavourite = currentFavourites.some(fav => fav.item._id === item.itemid);
    // console.log("isFavourite=====>",isFavourite)
    // console.log("current favs=======>",currentFavourites)
    // console.log("ITEM ID=========>",item.itemid)
    if (isFavourite) {
        await removeFavouriteItem(item, dispatch);
    } else {
        await addFavouriteItem(item, dispatch);
    }
};
