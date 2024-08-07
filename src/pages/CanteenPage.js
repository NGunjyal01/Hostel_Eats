import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCanteenPageDetails, searchItemByCanteen, addCartItem, removeCartItem, resetCartItem } from '../services/customerAPI';
import ConfirmationalModal from '../components/common/ConfirmationalModal';
import { setCanteenDetails } from '../slices/canteenPageSlice';
import { toggleFavouriteItem } from '../services/favouriteAPI'; 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { formatTime } from '../utils/formatTime';

const CanteenPage = () => {
    const { canteenId } = useParams();
    const dispatch = useDispatch();
    const canteenData = useSelector(state => state.canteenPage.selectedCanteen);
    const cart = useSelector(store => store.cart);
    const [searchInput, setSearchInput] = useState('');
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const cartItemMap = !Object.keys(cart).length ? new Map() : new Map(cart.items.map(item => [item.item._id, item.quantity]));
    // const favorites = useSelector(state => Array.isArray(state.favourites) ? state.favourites : []);

    const favorites=useSelector(store=>store.favourites)
    const favouriteItems=favorites.items || []


    useEffect(() => {
        const fetchCanteenData = async () => {
            const data = await getCanteenPageDetails(canteenId, dispatch);
            if (data) {
                dispatch(setCanteenDetails(data)); 
                setItemsToDisplay(data.menuitems);
            }
        };

        fetchCanteenData();
    }, [canteenId, dispatch]);

    useEffect(() => {
        if (searchInput.length === 0 && canteenData) {
            setItemsToDisplay(canteenData.menuitems);
        }
    }, [searchInput, canteenData]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            shopid: canteenId,
            itemName: searchInput.toLowerCase()
        };
        const results = await searchItemByCanteen(formData);
        if (results && results.data) {
            setItemsToDisplay(results.data);
        } else {
            setItemsToDisplay([]);
        }
    };

    const handleModalConfirm = async (itemid) => {
        const response = await resetCartItem();
        if(response){
            addCartItem({ itemid }, dispatch);
            setShowModal(null);
        }
    };

    const handleModalCancel = () => {
        setShowModal(null);
    };

    const handleAdd = async (e, itemid, shopid) => {
        e.stopPropagation();
        const cartCanteenId = !Object.keys(cart).length ? null : cart.items[0].item.shopid._id;
        if (cartCanteenId && cartCanteenId !== shopid ) {
            setShowModal({
                text1: "Ordering from multiple canteens is not supported",
                text2: "Your cart will be reset if you want to add this item. Proceed?",
                btn1Text: "Yes",
                btn2Text: "No",
                btn1Handler: () => handleModalConfirm(itemid),
                btn2Handler: handleModalCancel,
            });
        } else {
            addCartItem({ itemid }, dispatch);
        }
    };

    const handleRemove = async (e, itemid) => {
        e.stopPropagation();
        removeCartItem({ itemid }, dispatch);
    };

    const handleToggleFavourite = (e, item) => {
        e.stopPropagation();
        console.log("handleToggleFavorite called with item:", item);
        toggleFavouriteItem(item, dispatch, favouriteItems);
    };

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white pt-24">
            <div className="bg-[#31363F] w-full sm:w-7/12 mx-auto p-4 sm:p-6 rounded-lg shadow-2xl mb-6 flex flex-col items-center">
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">{canteenData?.canteenName}</h1>
                <p className="text-gray-400 mb-1 text-center">Address: {canteenData?.address}</p>
                <p className="text-gray-400 mb-1 text-center">Opening Time: {canteenData?.openingTime?formatTime(canteenData.openingTime):"NA"}</p>
                <p className="text-gray-400 mb-1 text-center">Closing Time: {canteenData?.closingTime?formatTime(canteenData.closingTime):"NA"}</p>
                <p className="text-gray-400 mb-1 text-center">Status: {canteenData?.status}</p>
            </div>
            <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                    <span className="flex-grow border-t border-gray-400 mx-2"></span>
                    <span className="mx-4">Menu</span>
                    <span className="flex-grow border-t border-gray-400 mx-2"></span>
                </h2>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                        placeholder="Search for dishes"
                        className="py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-[#31363F] text-white w-full sm:w-7/12 mb-3 sm:mb-6"
                    />
                    <button type="submit" className="sm:ml-2 mb-4 py-2 px-4 rounded-lg bg-[#76ABAE] text-white w-full sm:w-auto">Search</button>
                </form>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-24 sm:gap-6 justify-items-center">
                {itemsToDisplay.map(item => (
                    <div key={item._id} className="bg-[#31363F] sm:mt-0 sm:mb-0 mb-5 mt-5  rounded-lg shadow-lg w-full sm:w-7/12 flex flex-col sm:flex-row justify-between items-center relative sm:p-4 p-4 pb-8">
                        <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-400 mb-2 break-words">{item.description}</p>
                            <p className="text-gray-400 mb-2">Price: ₹{item.price}</p>
                        </div>
                        <div className="relative flex items-center">
                            <div className="w-full h-52 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-2 right-2">
                                {favouriteItems.some(fav => fav.item._id === item._id) ? (
                                    <AiFillHeart className="text-red-500 text-2xl sm:text-xl cursor-pointer" onClick={(e) => handleToggleFavourite(e, { itemid: item._id, name: item.name, canteenName: canteenData?.canteenName, price: item.price , imageUrl:item.imageUrl, isFavourite: true })} />
                                ) : (
                                    <AiOutlineHeart className="text-white text-2xl sm:text-xl cursor-pointer" onClick={(e) => handleToggleFavourite(e, { itemid: item._id, name: item.name, canteenName: canteenData?.canteenName, price: item.price , imageUrl:item.imageUrl, isFavourite: false })} />
                                )}
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full flex justify-center">
                                {cartItemMap.has(item._id) ? (
                                    <div className="flex items-center justify-center space-x-0">
                                        <button
                                            onClick={(e) => handleRemove(e, item._id)}
                                            className="sm:px-6 sm:py-1 py-2 px-8 bg-red-500 text-white rounded-l-lg"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 bg-[#31363F] text-white">{cartItemMap.get(item._id)}</span>
                                        <button
                                            onClick={(e) => handleAdd(e, item._id, canteenId)}
                                            className="sm:px-6 sm:py-1 py-2 px-8 bg-[#76ABAE] text-white rounded-r-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => handleAdd(e, item._id, canteenId)}
                                        className="bg-[#76ABAE] text-white py-2 px-12 sm:py-1 sm:px-6 rounded-lg"
                                    >
                                        ADD
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <ConfirmationalModal modalData={showModal} />
            )}
        </div>
    );
}

export default CanteenPage;
