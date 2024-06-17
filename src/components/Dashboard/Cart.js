import { useEffect } from "react";
import { getCartItems } from "../../services/customerAPI";
import { useDispatch, useSelector } from "react-redux";


const Cart = () => {

    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        getCartItems(dispatch);
    },[]);

    return (
        <div className="flex flex-col items-center mt-[10%]">
            {!cart ? <h1 className="text-3xl font-bold uppercase tracking-wider -ml-[12%]"> Your cart is empty</h1> 
            : <div>
                
            </div>}
        </div>
    )
}

export default Cart;
