import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCanteenDetails } from '../services/ownerAPI';
const config = {headers:{'Content-Type':'multipart/form-data'},withCredentials:true};
const CanteenPage = () => {
    const { canteenId } = useParams();
    const dispatch = useDispatch();
    const canteenData = useSelector(state => state.canteenPage.selectedCanteen);

    useEffect(() => {
        const fetchCanteenData = async () => {
            await getCanteenDetails(canteenId, dispatch,config);
        };

        fetchCanteenData();
    }, [canteenId, dispatch]);

    if (!canteenData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white">
            <div className="bg-[#31363F] p-6 rounded-lg shadow-lg">
                <img src={canteenData.imageUrl} alt={canteenData.canteenName} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h1 className="text-3xl font-bold mb-4">{canteenData.canteenName}</h1>
                <p className="text-gray-400 mb-4">Opening Time: {canteenData.openingTime}</p>
                <p className="text-gray-400 mb-4">Closing Time: {canteenData.closingTime}</p>
                <p className="text-gray-400 mb-4">Status: {canteenData.status}</p>
            </div>
        </div>
    );
}

export default CanteenPage;
