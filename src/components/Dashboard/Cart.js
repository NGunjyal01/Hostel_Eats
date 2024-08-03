
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../services/customerAPI";
import { useState } from "react";
import { cashOrder, placeOrder } from "../../services/paymentAPI";
import { useNavigate } from "react-router-dom";
import emptyCartIcon from '../../empty-cart.png';

const Cart = () => {

    const cart = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const [isCash,setIsCash] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdd = async (itemid) => {
        addCartItem({itemid}, dispatch);
    };

    const handleRemove = (itemid) => {
        removeCartItem({itemid}, dispatch);
    };
    
    const handleOnlinePayment = ()=>{
        const userDetails = new FormData;
        userDetails.append('name',user.firstName + " " + user.lastName);
        userDetails.append('email',user.email);
        userDetails.append('contact',user.phone);
        placeOrder(cart.totalPrice,userDetails,navigate,dispatch);
    }

    const handleCashPayment = ()=>{
        cashOrder({amount:cart.totalPrice},navigate,dispatch);
    }

    return (
        <div className="flex flex-col items-center relative">
            {!Object.keys(cart).length
            ? <div className="sm:-ml-[12%] flex flex-col items-center">
                <img src={emptyCartIcon} alt="image" className="w-56 sm:w-96"/>
                <h1 className="text-xl sm:text-3xl font-bold uppercase tracking-wider"> Your cart is empty</h1>
                <button className="bg-[#76ABAE] px-5 py-1 mt-5 rounded-lg" onClick={()=>navigate('/explore')}>Continue Your Search</button>
            </div>  
            : <div className="bg-[#222831] w-[85%] lg:w-[80%] xl:w-[70%] h-fit px-4 md:px-5 lg:px-10 py-4 pb-10 sm:py-5 md:py-7 lg:py-10 sm:mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
                <h1 className="text-2xl font-semibold">{cart.canteenName}</h1>
                <div className="sm:mt-10">
                    {cart.items.map(({item,quantity}) => <div key={item._id} className="grid grid-cols-12 items-center mt-7">
                        <img src={item.imageUrl} className="col-span-6 sm:col-span-3 w-[90%] h-20 sm:size-[85%] rounded-lg object-fill"/>
                        <div className="col-span-6 sm:col-span-4 space-y-2">
                            <h1 className="text-sm sm:text-base break-words">{item.name}</h1>
                            <p className="text-xs sm:text-base break-words">{item.description}</p>
                        </div>
                        <div className="col-span-full sm:col-span-4 flex gap-5  items-center mt-5 sm:mt-0">
                            <button className="w-20 sm:w-24 py-0.5 sm:py-1 bg-red-500 rounded-lg" onClick={()=>{handleRemove(item._id)}}> - </button>
                            <h1 className="">{quantity}</h1>
                            <button className="w-20 sm:w-24 py-0.5 sm:py-1 bg-[#76ABAE] rounded-lg" onClick={()=>{handleAdd(item._id)}}>+</button>
                            <h1 className="text-xs sm:text-base whitespace-nowrap">{"₹ "+quantity*item.price}</h1>
                        </div>
                        
                    </div>)}
                </div>
                <div className="mt-14 flex flex-col sm:flex-row items-center sm:gap-10">
                    <h1 className="text-base">Choose Payment Method</h1>
                    <div className="bg-[#31363F] w-[80%] sm:w-[50%] p-2 rounded-lg sm:rounded-2xl text-sm md:text-base mt-5 sm:mt-0">
                        <button  className={`${!isCash?'bg-[#76ABAE]':''} w-1/2 p-2 rounded-lg sm:rounded-xl`}
                        onClick={()=>{setIsCash(false)}}>
                            Online
                        </button>
                        <button className={`${isCash?'bg-[#76ABAE]':''} w-1/2 p-2 rounded-lg sm:rounded-xl`}
                        onClick={()=>{setIsCash(true)}}>
                            Cash
                        </button>
                    </div>
                </div>
                <div className="mt-10 sm:mt-16 flex justify-center">
                    {!isCash ? <button className="bg-[#76ABAE] w-[90%] sm:w-[60%] py-2 rounded-lg" onClick={handleOnlinePayment}>
                        Proceed To Pay {"₹ "+ cart.totalPrice}
                    </button> 
                    : <button className="bg-[#76ABAE] w-[90%] sm:w-[60%] py-2 rounded-lg" onClick={handleCashPayment}>
                        Confirm Order
                    </button>}
                </div>
            </div>}
        </div>
    )
}

export default Cart;
