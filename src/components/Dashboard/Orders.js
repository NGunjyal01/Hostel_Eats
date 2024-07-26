import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getOrderHistory } from "../../services/customerAPI";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";

const BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;

const socket = io.connect(BASE_URL);

const Orders = () => {
    const user = useSelector(store => store.user);
    const orderHistory = useSelector(store => store.orderHistory?.customer);
    const [currentItems,setCurrentItems] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        socket.emit('joinRoom',user._id);
        socket.on('orderUpdate',(order)=>{
            console.log("socket order ",order);
        });
        getOrderHistory(dispatch);
    },[]);

    return (
        <div className="flex flex-col items-center relative">
            {!orderHistory ? <div className="mt-[12%] -ml-[15%]"><Spinner/></div>
            :<div className="w-[85%] flex flex-col items-center" id="orderHistory">
                <h1 className="absolute -ml-2 sm:-ml-3 md:-ml-5 lg:-ml-[78%] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Order History</h1>
                <div className="grid grid-cols-2 w-full mt-20">
                    {currentItems?.map( (order) =>{
                        const date = formatDate(order.createdAt.split('T')[0]);
                        const time = formatTime(order.createdAt.split('T')[1].split(':')[0]+":"+order.createdAt.split('T')[1].split(':')[1]);
                        // const items = order.items.map(item => item.item.name + " x " + item.quantity).join(', ');
                        return (
                        <div key={order._id} className="col-span-1 bg-[#31363F] py-4 px-4 w-[85%] mx-10 mt-8 rounded-lg">
                            <div className="flex flex-row gap-7">
                                <img src={order.items[0].item.imageUrl} alt="dish-img" className="w-40 h-28 object-fill"/>
                                <div className="space-y-1">
                                    <h1>{order.canteenName}</h1>
                                    <p className="text-xs">{"ORDER#"+order._id}</p>
                                    <p className="text-sm">{date + ", "  + time}</p>
                                    <button>View Details</button>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-row gap-10">
                                <h1>{"Total Bill: ₹" + order.totalAmount}</h1>
                                <button className="uppercase tracking-wider">Reorder</button>
                            </div>
                        </div>);
                    })}
                </div>
                <Pagination allItems={orderHistory} itemsPerPage={10} setCurrentItems={setCurrentItems} scrollTo={"orderHistory"}/>
            </div>}
        </div>
    )
}

export default Orders
