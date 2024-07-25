import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCanteenDetails, getOrderHistory } from "../../services/ownerAPI";
import { formatTime } from "../../utils/formatTime";
import { PieChart } from "react-minimal-pie-chart";
import {io} from "socket.io-client";
import Spinner from "../common/Spinner";
import { setCanteenDetails } from "../../slices/canteenSlice";
import { formatDate } from "../../utils/formatDate";

const BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
const socket = io.connect(BASE_URL);

const CanteenDashboard = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const canteenDetails = useSelector(store => store.canteen.canteenDetails);
    const orderHistory = useSelector(store => store.orderHistory.owner);
    useEffect(()=>{
        getCanteenDetails(id,dispatch).then(()=>{
            if (canteenDetails) {
                getOrderHistory({shopid:canteenDetails._id},dispatch);
                socket.emit("joinRoom", canteenDetails._id);
                socket.on("newOrder", (order) => {
                    console.log(order);
                });
            }
        });
        return ()=>{
            dispatch(setCanteenDetails(null));
            // socket.disconnect();
        }
    },[id]);

    const inputStyle = "bg-[#31363F] w-[95%] md:w-[90%] lg:w-[80%] px-2 py-2 rounded-md mt-2";
    const data = [
        { title: 'Online', value: 10, color: '#E38627' },
        { title: 'Cash', value: 15, color: '#C13C37' },
    ];

    return (
    <div className="flex flex-col justify-center items-center">
        {(!canteenDetails || !orderHistory) ? <div className="mt-[10%] -ml-[15%]"><Spinner/></div> 
        : <div className="w-[90%] sm:w-[80%]  h-fit pb-12 mt-14 relative">
            <h1 className="absolute -mt-[22%] sm:-mt-[17%] md:-mt-[15%] lg:-mt-[17%] xl:-mt-[7%] -ml-4 sm:-ml-3 md:-ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Canteen Dashboard</h1>
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-7 grid grid-cols-2">
                    <div className="col-span-1 mt-5 sm:mt-8 text-sm lg:text-base flex flex-col">
                        <label>Canteen Name</label>
                        <input type="text" name='canteenName' className={`${inputStyle}`} value={canteenDetails.canteenName}
                        disabled={true}/>
                    </div>
                    <div className="col-span-1 mt-5 sm:mt-8 text-sm lg:text-base flex flex-col">
                        <label>Canteen Address</label>
                        <input type="text" name='address' className={`${inputStyle}`} value={canteenDetails.address}
                        disabled={true}/>
                    </div>
                    <div className="col-span-1 mt-5 sm:mt-8 text-sm lg:text-base flex flex-col">
                        <label>Opening Time</label>
                        <input type="text" name='openingTime' className={`${inputStyle}`} value={formatTime(canteenDetails.openingTime)}
                        disabled={true}/>
                    </div>
                    <div className="col-span-1 mt-5 sm:mt-8 text-sm lg:text-base flex flex-col">
                        <label>Closing Time</label>
                        <input type="text" name='closingTime' className={`${inputStyle}`} value={formatTime(canteenDetails.closingTime)}
                        disabled={true}/>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col items-center space-y-10">
                    <div className="grid grid-cols-2">
                        <h1 className="col-span-1 flex items-center">Total Revenue</h1>
                        <PieChart data={data} className="ml-5 size-28 col-span-1"/>
                    </div>
                    <div className="grid grid-cols-2">
                        <h1 className="col-span-1 flex items-center">This Month Revenue</h1>
                        <PieChart data={data} className="ml-7 size-28 col-span-1"/>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="text-2xl">Order History</h1>
                <div className="grid grid-cols-2 w-full mt-10">
                {orderHistory.map( (order) =>{
                    const date = order.createdAt ? formatDate(order.createdAt.split('T')[0]) : '';
                    const time = order.createdAt ? formatTime(order.createdAt?.split('T')[1].split(':')[0]+":"+order.createdAt.split('T')[1].split(':')[1]) : '';
                    // const items = order.items.map(item => item.item.name + " x " + item.quantity).join(', ');
                    return (
                    <div key={order._id} className="col-span-1 bg-[#31363F] py-4 px-4 w-[85%] mt-8 rounded-lg">
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
                        </div>
                    </div>);
                })}
            </div>
            </div>
        </div>}
    </div>
    )
}

export default CanteenDashboard
