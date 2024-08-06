import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItem, removeCartItem, resetCartItem } from "../../services/customerAPI";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toggleFavouriteItem } from '../../services/favouriteAPI';
import toast from 'react-hot-toast';

const DishCard = ({ dish, setShowModal, cartItemMap }) => {

    const { itemid, itemName, canteenName, price, shopid, imageUrl } = dish;
    const cart = useSelector(store => store.cart);
    // const favourites = useSelector(store => Array.isArray(store.favourites) ? store.favourites : []);
    const favourites=useSelector(store=>store.favourites)
    const favouriteItems=favourites.items || []
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleModalConfirm = async (itemid) => {
        const response = await resetCartItem();
        if (response) {
            addCartItem({ itemid: itemid }, dispatch)
            setShowModal(null);
        }
    };

    const handleModalCancel = () => {
        setShowModal(null);
    };

    const handleCardClick = (canteenId) => {
        navigate(`/canteen/${canteenId}`);
    };

    const handleAdd = async (e) => {
        e.stopPropagation();
        console.log("canteen status",dish.status);
        if (dish.status.toLowerCase() === "closed") {
            toast.error("This canteen is closed. Please try again later.");
            return;
        }
        const cartCanteenId = !Object.keys(cart).length ? null : cart.items[0].item.shopid;
        console.log("cart canteen id=====>",cartCanteenId);
        if (cartCanteenId && cartCanteenId !== shopid) {
            setShowModal({
                text1: "Ordering from multiple canteens is not supported",
                text2: "Your cart will be reset if you want to add this item. Proceed?",
                btn1Text: "Yes",
                btn2Text: "No",
                btn1Handler: () => handleModalConfirm(itemid),
                btn2Handler: handleModalCancel,
            });
        } else {
            addCartItem({ itemid }, dispatch)
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeCartItem({ itemid }, dispatch);
    };

    const handleToggleFavourite = async (e, item) => {
        e.stopPropagation();
        await toggleFavouriteItem(item, dispatch,favouriteItems);
    };

    return (
        <div key={itemid} className=" bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-auto sm:h-96 flex flex-col justify-between sm:w-auto w-full" onClick={() => handleCardClick(shopid)}>
            
            <div className="relative">
                <img src={imageUrl} alt={itemName} className="w-full h-36 object-cover rounded-lg mb-4" />               
                <div className="absolute top-2 right-2">
                    {favouriteItems.some(fav => fav.item._id === itemid) ? (
                        <AiFillHeart className="text-red-500 text-2xl sm:text-xl cursor-pointer" onClick={(e) => handleToggleFavourite(e, { itemid, name: itemName, canteenName, price, imageUrl})} />
                    ) : (
                        <AiOutlineHeart className="text-white text-2xl sm:text-xl cursor-pointer" onClick={(e) => handleToggleFavourite(e, { itemid, name: itemName, canteenName, price, imageUrl})} />
                    )}
                </div>
            </div>
            <div className="overflow-hidden flex-grow">
                <h3 className="sm:text-2xl text-xl font-semibold mb-2 break-words">{itemName}</h3>
                <p className="sm:text-lg text-md text-gray-400 mb-1 break-words">Available at: {canteenName}</p>
                <p className="sm:text-lg text-md text-gray-400 mb-2">Price: ₹{price}</p>
            </div>
            {cartItemMap.has(itemid) ? (
                <div className="flex items-center justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={handleRemove}
                        className="px-10 py-1 bg-red-500 text-white rounded-lg"
                    >
                        -
                    </button>
                    <span>{cartItemMap.get(itemid)}</span>
                    <button
                        onClick={handleAdd}
                        className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAdd}
                    className="w-full pt-[2%] py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                >
                    ADD
                </button>
            )}
        </div>
    );
};

export default DishCard;