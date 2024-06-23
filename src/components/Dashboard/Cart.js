
import { useSelector } from "react-redux";


const Cart = () => {

    const cart = useSelector(store => store.cart);
    const {items} = cart;

    return (
        <div className="flex flex-col items-center">
            {!cart ? <h1 className="text-3xl font-bold uppercase tracking-wider  mt-[10%] -ml-[12%]"> Your cart is empty</h1> 
            : <div className="bg-[#222831] w-[80%] lg:w-[70%] h-fit px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-10 rounded-md sm:rounded-lg md:rounded-xl relative">
                <h1 className="text-2xl font-semibold">{cart.canteenName}</h1>
                <div className="mt-10">
                    {items.map(({item,quantity}) => <div key={item._id} className="flex flex-row items-center gap-20">
                        <img src={item.imageUrl} className="size-20 object-contain"/>
                        <div>
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            
                        </div>
                    </div>)}
                </div>
            </div>}
        </div>
    )
}

export default Cart;
