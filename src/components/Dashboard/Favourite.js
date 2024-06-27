import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toggleFavouriteItem } from '../../services/favouriteAPI';
import { faV } from '@fortawesome/free-solid-svg-icons';

const Favourite = () => {
    const dispatch = useDispatch();
    const favourites = useSelector(state => state.favourites);

    const handleToggleFavourite = (e, item) => {
        e.stopPropagation();
        toggleFavouriteItem(item, dispatch);
    };

    return (
        <div className="min-h-screen p-6 text-white pt-24">
            {favourites.length===0 ? <h1 className="text-3xl font-bold uppercase tracking-wider  mt-[4%] ml-[28%]"> No Favourite dishes to show</h1> 
            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favourites.map(dish => (
                    <div key={dish.itemid} className="bg-[#31363F] p-4 rounded-lg shadow-lg w-full flex justify-between items-center relative">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                            <p className="text-gray-400 mb-2">{dish.canteenName}</p>
                            <p className="text-gray-400 mb-2">Price: ₹{dish.price}</p>
                        </div>
                        <div className="relative flex items-center">
                            <img src={dish.imageUrl} alt={dish.name} className="w-32 h-32 object-cover rounded-lg" />
                            {console.log("ImageURL===>",dish.imageUrl)}
                            <div className="absolute top-2 right-2">
                                <AiFillHeart className="text-red-500 cursor-pointer" onClick={(e) => handleToggleFavourite(e, dish)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default Favourite;
