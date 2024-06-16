import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCanteenPageDetails } from '../services/customerAPI';
import { setCanteenDetails } from '../slices/canteenPageSlice';

const CanteenPage = () => {
    const { canteenId } = useParams();
    const dispatch = useDispatch();
    const canteenData = useSelector(state => state.canteenPage.selectedCanteen);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchCanteenData = async () => {
            const data = await getCanteenPageDetails(canteenId, dispatch);
            if (data) {
                dispatch(setCanteenDetails(data)); 
            }
        };

        fetchCanteenData();
    }, [canteenId, dispatch]);

    if (!canteenData) {
        return <div>Loading...</div>;
    }

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white pt-24">
            <div className="bg-[#31363F] w-7/12 mx-auto p-6 rounded-lg shadow-2xl mb-6">
                <h1 className="text-4xl font-bold mb-2">{canteenData.canteenName}</h1>
                <p className="text-gray-400 mb-1">Address: {canteenData.address}</p>
                <p className="text-gray-400 mb-1">Opening Time: {canteenData.openingTime}</p>
                <p className="text-gray-400 mb-1">Closing Time: {canteenData.closingTime}</p>
                <p className="text-gray-400 mb-1">Status: {canteenData.status}</p>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <   span className="flex-grow border-t border-gray-400 mx-2"></span>
                    <span className="mx-4">Menu</span>
                    <span className="flex-grow border-t border-gray-400 mx-2"></span>
                </h2>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="Search for dishes"
                    className="py-3 px-4 rounded-lg bg-[#31363F] text-white w-7/12 mb-6"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 justify-items-center">
                {canteenData.menuitems.map(item => (
                    <div key={item._id} className="bg-[#31363F] p-4 rounded-lg shadow-lg w-7/12 flex justify-between items-center pb-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-400 mb-2">{item.description}</p>
                            <p className="text-gray-400 mb-2">Price: ₹{item.price}</p>
                        </div>
                        <div className="relative">
                            <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                            <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[#76ABAE] text-white py-1 px-6 rounded-lg">ADD</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CanteenPage;
