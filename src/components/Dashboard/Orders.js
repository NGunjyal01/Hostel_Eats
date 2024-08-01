import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../services/customerAPI";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import { SiTicktick } from "react-icons/si";
import ViewDetailsModal from "../common/ViewDetailsModal";

const Orders = () => {
    
    const orderHistory = useSelector(store => store.orderHistory);
    const [currentItems,setCurrentItems] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [showOrder,setShowOrder] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        setLoading(true);
        getOrderHistory(dispatch).then(()=>setLoading(false));
    },[]);

    const handleToggleViewDetails = (order)=>{
        setShowOrder(order);
        setIsOpen(!isOpen);
    }

    return (
        <div className="flex flex-col items-center relative">
            {loading ? <div className="mt-[12%] -ml-[15%]"><Spinner/></div>
            :<div className="w-full flex flex-col items-center" id="orderHistory">
                {!orderHistory.length ? <div className="mt-[30%] sm:mt-[15%]">No Orders Found</div>
                :<>
                    <h1 className="absolute -ml-2 sm:-ml-3 md:-ml-5 lg:-ml-[78%] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Order History</h1>
                    <div className="grid grid-cols-2 w-full mt-14">
                        {currentItems?.map( (order) =>{
                            const date = formatDate(order.createdAt.split('T')[0]);
                            const time = formatTime(order.createdAt.split('T')[1].split(':')[0]+":"+order.createdAt.split('T')[1].split(':')[1]);
                            // const items = order.items.map(item => item.item.name + " x " + item.quantity).join(', ');
                            return (
                            <div key={order._id} className="col-span-1 bg-[#31363F] py-4 px-4 w-[85%] mx-10 mt-12 rounded-lg">
                                {order.status!=='completed' && <div className="absolute -mt-12 -ml-3 flex items-center gap-2">
                                    <div className="size-4 sm:size-5 border-2 border-orange-700 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="size-2 sm:size-3 bg-orange-700 rounded-full"/>    
                                    </div>
                                    <h1 className="text-sm sm:text-base">Live Order</h1>
                                </div>}
                                <div className="flex flex-row gap-7">
                                    <img src={order.items[0].item.imageUrl} alt="dish-img" className="w-40 h-28 object-fill"/>
                                    <div className="space-y-1">
                                        <h1>{order.canteenName}</h1>
                                        <p className="text-xs">{"ORDER#"+order._id}</p>
                                        <p className="text-sm">{date + ", "  + time}</p>
                                        <button onClick={()=>{ handleToggleViewDetails(order)}}>View Details</button>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-10 mt-4 ml-10 whitespace-nowrap">
                                    <div className="flex flex-col items-center space-y-2">
                                        <h1>Order Received</h1>
                                        <SiTicktick className='text-green-600'/>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <h1>Cooking</h1>
                                        <SiTicktick className={`${order.status!=='pending'?'text-green-600':''}`}/>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <h1>Pick Up</h1>
                                        <SiTicktick className={`${(order.status!=='pending' && order.status!=='preparing')?'text-green-600':''}`}/>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <h1>Completed</h1>
                                        <SiTicktick className={`${(order.status==='completed')?'text-green-600':''}`}/>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-row gap-10">
                                    <h1>{"Total Bill: ₹" + order.totalAmount}</h1>
                                    <h1>{"Payment Method: " + order.paymentstatus}</h1>
                                    {order.status==='completed' && <button className="uppercase tracking-wider">Reorder</button>}
                                </div>
                            </div>);
                        })}
                    </div>
                    {isOpen && <ViewDetailsModal close={handleToggleViewDetails} order={showOrder}/>}
                    <Pagination allItems={orderHistory} itemsPerPage={10} setCurrentItems={setCurrentItems} scrollTo={"orderHistory"}/>
                </>}
            </div>}
        </div>
    )
}

export default Orders
