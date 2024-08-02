import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { RxCross1 } from "react-icons/rx";

const ViewDetailsModal = ({ close,order }) => {
    
    const [isExiting, setIsExiting] = useState(false);
    const date = formatDate(order.createdAt.split('T')[0]);
    const time = formatTime(order.createdAt.split('T')[1].split(':')[0]+":"+order.createdAt.split('T')[1].split(':')[1]);
    const totalItems = order.items.length;
    console.log(order);

    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => close(), 200);
    };

    return (
    <div className={`fixed z-50 inset-0`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
        <div className={`fixed top-0 right-0 h-[95%] sm:h-full w-[95%] sm:w-[40%] mt-5 sm:mt-0 rounded-lg sm:rounded-none bg-gray-100 text-black overflow-y-scroll ${isExiting ? 'animate-slideOutToRight' : 'animate-slideInFromRight'}`}>
            <div className="mx-7 my-10 sm:m-10">
                <div className="flex items-center gap-2 sm:gap-5 mb-7">
                    <button onClick={handleClose}><RxCross1 size={25}/></button>
                    <p className="text-sm sm:text-base">{"ORDER#"+order._id}</p>
                </div>
                <h1 className="text-lg sm:text-2xl font-bold">{order.canteenName}</h1>
                <p className="mt-2 whitespace-nowrap text-sm sm:text-base">{"Order Placed: " + date + ", "  + time}</p>
                <div className="w-[90%] h-[0.05rem] bg-black mt-5 sm:mt-10"/>
                <div className="mt-3">
                    <h1 className="text-sm sm:text-base uppercase tracking-wide">{totalItems} {totalItems>1?" Items":" Item"}</h1>
                    <div className="mt-3">
                        {order.items.map(item => <div key={item.item._id} className="grid grid-cols-12 items-center max-w-[90%] mt-2">
                            <h1 className="col-span-10 text-sm sm:text-base break-words">{item.item.name + "x " + item.quantity}</h1>
                            <h1 className="col-span-2 text-sm sm:text-base">{"₹ " + item.item.price*item.quantity}</h1>
                        </div>)}
                    </div>
                </div>
                <div className="w-[90%] h-[0.05rem] bg-black mt-5 sm:mt-10"/>
                <h1 className="mt-5 font-bold">{"Total Bill: " + order.totalAmount}</h1>
            </div>
        </div>
    </div>
    );
};

export default ViewDetailsModal;
