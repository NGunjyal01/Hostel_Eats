import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCanteenDetails } from "../../services/ownerAPI";
import { formatTime } from "../../utils/formatTime";
import { PieChart } from "react-minimal-pie-chart";


const CanteenDashboard = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const canteenDetails = useSelector(store => store.canteen.canteenDetails);
    useEffect(()=>{
        getCanteenDetails(id,dispatch);
    },[id]);

    const formInfo = [{name:'canteenName',label:"Canteen Name",value:canteenDetails.canteenName},
        {name:'address',label:"Canteen Address",value:canteenDetails.address},
        {name:'openingTime',label:"Opening Time",value:formatTime(canteenDetails.openingTime)},
        {name:'closingTime',label:"Closing Time",value:formatTime(canteenDetails.closingTime)},
    ];
    const inputStyle = "bg-[#31363F] w-[95%] md:w-[90%] lg:w-[80%] px-2 py-2 rounded-md mt-2";
    const data = [
        { title: 'Online', value: 10, color: '#E38627' },
        { title: 'Cash', value: 15, color: '#C13C37' },
    ];

    return (
        <div className="flex flex-col justify-center items-center">
            <div className=" w-[90%] sm:w-[80%] lg:w-[70%] h-fit pb-12 mt-14 relative">
                <h1 className="absolute -mt-[22%] sm:-mt-[17%] md:-mt-[15%] lg:-mt-[17%] xl:-mt-[7%] -ml-4 sm:-ml-3 md:-ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Canteen Dashboard</h1>
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-7 grid grid-cols-2">
                        {formInfo.map(info => <div key={info.name} className="col-span-1 mt-5 sm:mt-8 text-sm lg:text-base flex flex-col">
                            <label>{info.label}</label>
                            <input type="text" name={info.name} className={`${inputStyle}`} value={info.value}
                            disabled={true}/>
                        </div>)}
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
                </div>
            </div>
        </div>
    )
}

export default CanteenDashboard
