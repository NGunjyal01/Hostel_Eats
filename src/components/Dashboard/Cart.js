
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../services/customerAPI";
import { useState } from "react";
import { cashOrder, placeOrder } from "../../services/paymentAPI";
import { useNavigate } from "react-router-dom";


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
            {!cart ? <h1 className="text-3xl font-bold uppercase tracking-wider  mt-[10%] -ml-[12%]"> Your cart is empty</h1> 
            : <div className="bg-[#222831] w-[80%] lg:w-[70%] h-fit px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
                <h1 className="text-2xl font-semibold">{cart.canteenName}</h1>
                <div className="mt-10">
                    {cart.items.map(({item,quantity}) => <div key={item._id} className="grid grid-cols-12 items-center mt-7">
                        <img src={item.imageUrl} className="col-span-3 size-24 object-fill"/>
                        <div className="col-span-4">
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                        </div>
                        <div className="col-span-4 flex gap-4">
                            <button className="px-10 py-1 bg-red-500 rounded-lg" onClick={()=>{handleRemove(item._id)}}> - </button>
                            <h1 className="mt-1">{quantity}</h1>
                            <button className="px-10 py-1 bg-[#76ABAE] rounded-lg" onClick={()=>{handleAdd(item._id)}}>+</button>
                        </div>
                        <h1 className="col-span-1">{quantity*item.price}</h1>
                    </div>)}
                </div>
                <div className="mt-14 flex items-center gap-10">
                    <h1>Choose Payment Method</h1>
                    <div className="bg-[#31363F] w-[50%] sm:p-2 rounded-lg sm:rounded-2xl text-sm md:text-base">
                        <button  className={`${!isCash?'bg-[#76ABAE]':''} w-1/2 p-1 sm:p-2 rounded-lg sm:rounded-xl`}
                        onClick={()=>{setIsCash(false)}}>
                            Online
                        </button>
                        <button className={`${isCash?'bg-[#76ABAE]':''} w-1/2 p-1 sm:p-2 rounded-lg sm:rounded-xl`}
                        onClick={()=>{setIsCash(true)}}>
                            Cash
                        </button>
                    </div>
                </div>
                <div className="mt-16 flex justify-center">
                    {!isCash ? <button className="bg-[#76ABAE] w-[60%] py-2 rounded-lg" onClick={handleOnlinePayment}>
                        Proceed To Pay {cart.totalPrice}
                    </button> 
                    : <button className="bg-[#76ABAE] w-[60%] py-2 rounded-lg" onClick={handleCashPayment}>
                        Confirm Order
                    </button>}
                </div>
            </div>}
        </div>
    )
}

export default Cart;
