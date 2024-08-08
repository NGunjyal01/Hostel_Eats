import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { toggleFavouriteItem } from '../../services/favouriteAPI';
import { loadFavouriteItems } from '../../services/customerAPI';
import { useNavigate } from 'react-router-dom';

const Favourite = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favourites = useSelector(store => store.favourites);
    const favouriteItems=favourites.items || []

    useEffect(() => {
        loadFavouriteItems(dispatch);
    }, [dispatch]);

    const handleToggleFavourite = async (e, item) => {
        e.stopPropagation();
        await toggleFavouriteItem(item, dispatch, favouriteItems);
    };

    const handleCardClick = (canteenId) => {
        navigate(`/canteen/${canteenId}`);
    };

    return (
        <div className="flex flex-col items-center relative min-h-screen p-6 text-white pt-0 sm:pt-2">
            {favourites.length === 0 ? (
                <h1 className="text-xl sm:text-3xl font-bold uppercase tracking-wider mt-[4%] ml-[2%]">No Favourite dishes</h1>
            ) : (
            <div className="bg-[#222831] w-full lg:w-[85%] h-fit px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-0 sm:mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
                <h1 className="text-2xl mb-10 font-semibold">Favourites</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favouriteItems.map(dish => (
                        dish.item && (
                            <div key={dish.item.itemid} className="bg-[#31363F] p-4 rounded-lg shadow-lg w-full flex justify-between items-center relative cursor-pointer" onClick={() => handleCardClick(dish.item.shopid)}>
                                <div className="w-1/2">
                                    <h3 className="text-base sm:text-xl font-semibold mb-2 break-words">{dish.item.name}</h3>
                                    <p className="text-gray-400 text-xs sm:text-base mb-2 break-words">{dish.canteenName}</p>
                                    <p className="text-gray-400 text-xs sm:text-base mb-2 break-words">{dish.item.description}</p>
                                    <p className="text-gray-400 text-xs sm:text-base mb-2">Price: ₹{dish.item.price}</p>
                                </div>
                                <div className="relative flex items-center">
                                    <img src={dish.item.imageUrl} alt={dish.item.name} className="w-32 h-32 object-cover rounded-lg" />
                                    <div className="absolute top-2 right-2">
                                        <AiFillHeart className="text-red-500 cursor-pointer text-lg sm:text-xl" onClick={(e) => handleToggleFavourite(e, { itemid: dish.item._id, name: dish.item.name, canteenName: dish.canteenName, price: dish.item.price , imageUrl:dish.item.imageUrl, isFavourite: true })} />
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                </div>)}
        </div>
    );
};

export default Favourite;
