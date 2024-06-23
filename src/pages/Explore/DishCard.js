import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItem, removeCartItem, resetCartItem } from "../../services/customerAPI";

const DishCard = ({ dish, setShowModal,cartItemIds }) => {

    const {itemid,itemName,canteenName,price,shopid,imageUrl} = dish;
    const cart = useSelector(store => store.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleModalConfirm = async (itemid) => {
        const response = await resetCartItem();
        if(response){
            addCartItem({itemid:itemid},dispatch)
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
        const cartCanteenId = !cart ? null : cart.items[0].item.shopid._id;
        if (cartCanteenId && cartCanteenId !== shopid ) {
            setShowModal({
                text1: "Ordering from multiple canteens is not supported",
                text2: "Your cart will be reset if you want to add this item. Proceed?",
                btn1Text: "Yes",
                btn2Text: "No",
                btn1Handler:() => handleModalConfirm(itemid),
                btn2Handler: handleModalCancel,
            });
        } else {
            addCartItem({ itemid: itemid }, dispatch)
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeCartItem({ itemid: itemid }, dispatch);
    };

    return (<div key={itemid} className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between" onClick={() => handleCardClick(shopid)}>
        <img src={imageUrl} alt={itemName} className="w-full h-36 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-semibold mb-2">{itemName}</h3>
        <p className="text-gray-400 mb-2">Available at: {canteenName}</p>
        <p className="text-gray-400 mb-2">Price: {price}</p>
        {cartItemIds.has(itemid) ? (
            <div className="flex items-center justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleRemove}
                    className="px-10 py-1 bg-red-500 text-white rounded-lg"
                >
                    -
                </button>
                <span>{cartItemIds.get(itemid)}</span>
                <button
                    onClick={handleAdd}
                    className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                >
                    +
                </button>
            </div>
        ) : (
             (
                <button
                    onClick={handleAdd}
                    className="w-full py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                >
                    ADD
                </button>
            )
        )}
    </div>
)};

export default DishCard;