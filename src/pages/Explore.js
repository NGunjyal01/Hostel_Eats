import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import ConfirmationalModal from '../components/common/ConfirmationalModal';
import { searchItem, searchCanteen, getPopularDishes, getCanteenPageDetails } from '../services/customerAPI';
import { useNavigate } from 'react-router-dom';
import { setCanteensData } from '../slices/canteenPageSlice';

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#76ABAE]"
            style={{ fontSize: '2em' }}
            onClick={onClick}
        >
            <FaRegArrowAltCircleLeft />
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#76ABAE]"
            style={{ fontSize: '2em' }}
            onClick={onClick}
        >
            <FaRegArrowAltCircleRight />
        </div>
    );
};

const Explore = () => {
    const [searchInput, setSearchInput] = useState('');
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [popularDishes, setPopularDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [filteredCanteens, setFilteredCanteens] = useState([]);
    const [searchType, setSearchType] = useState('dishes');
    const [quantities, setQuantities] = useState({});
    const [currentCanteen, setCurrentCanteen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pendingItem, setPendingItem] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPopularDishes();
    }, []);

    const fetchPopularDishes = async () => {
        try {
            const dishes = await getPopularDishes();
            if (Array.isArray(dishes.data)) {
                const dishesWithCanteenNames = await Promise.all(dishes.data.slice(0, 4).map(async (dish) => {
                    const canteenDetails = await getCanteenPageDetails(dish.shopid);
                    return { ...dish, canteenName: canteenDetails?.canteenName || 'Unknown Canteen' };
                }));
                setPopularDishes(dishesWithCanteenNames);
            }
        } catch (error) {
            console.error("Error fetching popular dishes:", error);
        }
    };

    const filterResults = async (input) => {
        const lowerCaseInput = input.toLowerCase();
        const formData = {
            itemName: lowerCaseInput
        };

        try {
            const dishResult = await searchItem(formData);
            setFilteredDishes(Array.isArray(dishResult) ? dishResult : []);
        } catch (error) {
            console.error("Error searching for items:", error);
            setFilteredDishes([]);
        }

        try {
            const canteenResult = await searchCanteen(formData);
            if (Array.isArray(canteenResult)) {
                dispatch(setCanteensData(canteenResult));
            }
            setFilteredCanteens(Array.isArray(canteenResult) ? canteenResult : []);
        } catch (error) {
            console.error("Error searching for canteens:", error);
            setFilteredCanteens([]);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setShowSearchOptions(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput) {
            setShowSearchOptions(true);
            filterResults(searchInput);
        }
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setShowSearchOptions(false);
        setFilteredDishes([]);
        setFilteredCanteens([]);
    };

    const handleAdd = (dish, e) => {
        e.stopPropagation();
        const cartIsEmpty = Object.keys(quantities).length === 0;
    
        if (!cartIsEmpty && currentCanteen && currentCanteen !== dish.shopid) {
            setPendingItem(dish);
            setShowModal(true);
        } else {
            setCurrentCanteen(dish.shopid);
            setQuantities(prevQuantities => ({ ...prevQuantities, [dish.itemid]: 1 }));
        }
    };

    const handleIncrement = (id, e) => {
        e.stopPropagation();
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
    };

    const handleDecrement = (id, e) => {
        e.stopPropagation();
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            if (newQuantities[id] > 1) {
                newQuantities[id]--;
            } else {
                delete newQuantities[id];
            }
    
            if (Object.keys(newQuantities).length === 0) {
                setCurrentCanteen(null);
            }
    
            return newQuantities;
        });
    };

    const handleModalConfirm = () => {
        setQuantities({ [pendingItem.itemid]: 1 });
        setCurrentCanteen(pendingItem.shopid);
        setPendingItem(null);
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setPendingItem(null);
        setShowModal(false);
    };

    const handleCardClick = (canteenId) => {
        navigate(`/canteen/${canteenId}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const renderDishCard = (dish) => (
        <div key={dish.itemid} className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between" onClick={() => handleCardClick(dish.shopid)}>
            <img src={dish.imageUrl} alt={dish.itemName} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{dish.itemName}</h3>
            <p className="text-gray-400 mb-2">Available at: {dish.canteenName}</p>
            <p className="text-gray-400 mb-2">Price: {dish.price}</p>
            {quantities[dish.itemid] ? (
                <div className="flex items-center justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={(e) => handleDecrement(dish.itemid, e)}
                        className="px-10 py-1 bg-red-500 text-white rounded-lg"
                    >
                        -
                    </button>
                    <span>{quantities[dish.itemid]}</span>
                    <button
                        onClick={(e) => handleIncrement(dish.itemid, e)}
                        className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                    >
                        +
                    </button>
                </div>
            ) : (
                searchInput && (
                    <button
                        onClick={(e) => handleAdd(dish, e)}
                        className="w-full py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                    >
                        ADD
                    </button>
                )
            )}
        </div>
    );

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white relative z-0">
            <form onSubmit={handleSearchSubmit} className="mb-6 relative z-10 mt-12 pt-10 flex justify-center">
                <div className="relative w-6/12">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                        placeholder="Search for food items or canteens..."
                        className="py-3 px-4 rounded-lg bg-[#31363F] text-white w-full"
                    />
                    {showSearchOptions ? (
                        <AiOutlineClose
                            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 cursor-pointer"
                            size={24}
                            onClick={handleClearSearch}
                        />
                    ) : (
                        <AiOutlineSearch
                            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400"
                            size={24}
                        />
                    )}
                </div>
            </form>
            {showSearchOptions && searchInput && (
                <div className="mb-6 ml-96 pl-5">
                    <div className="space-x-4">
                        <button
                            className={`py-2 px-4 rounded-lg ${searchType === 'dishes' ? 'bg-gray-700' : 'bg-gray-500'}`}
                            onClick={() => setSearchType('dishes')}
                        >
                            Dishes
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg ${searchType === 'canteens' ? 'bg-gray-700' : 'bg-gray-500'}`}
                            onClick={() => setSearchType('canteens')}
                        >
                            Canteens
                        </button>
                    </div>
                </div>
            )}

            {showSearchOptions && searchInput && (
                <div className="w-6/12 mx-auto mb-10">
                    <h2 className="text-2xl font-bold mb-4">{searchType === 'dishes' ? 'Search Results for Dishes' : 'Search Results for Canteens'}</h2>
                    {searchType === 'dishes' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDishes.map(dish => renderDishCard(dish))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredCanteens.map(canteen => (
                                <div key={canteen.id} className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer" onClick={() => handleCardClick(canteen.shopid)}>
                                    <img src={canteen.imageUrl} alt={canteen.canteenName} className="w-24 h-24 object-cover rounded-lg mr-4" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{canteen.canteenName}</h3>
                                        <p className="text-gray-400 mb-2">Opening Time: {canteen.openingTime}</p>
                                        <p className="text-gray-400 mb-2">Closing Time: {canteen.closingTime}</p>
                                        <p className="text-gray-400">{canteen.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!showSearchOptions && (
                <div className="mb-10 px-8">
                    <h2 className="text-2xl font-bold ml-6 mb-20 mt-16">Popular Dishes</h2>
                    <Slider {...settings} className="mx-4">
                        {popularDishes.map(dish => (
                            <div key={dish._id} className="px-2">
                                <div className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between" onClick={() => handleCardClick(dish.shopid)}>
                                    <img src={dish.imageUrl} alt={dish.itemName} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                                    <p className="text-gray-400 mb-2">Available at: {dish.canteenName}</p>
                                    <p className="text-gray-400 mb-2">Price: {dish.price}</p>
                                    {quantities[dish.itemid] ? (
                                        <div className="flex items-center justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={(e) => handleDecrement(dish.itemid, e)}
                                                className="px-10 py-1 bg-red-500 text-white rounded-lg"
                                            >
                                                -
                                            </button>
                                            <span>{quantities[dish.itemid]}</span>
                                            <button
                                                onClick={(e) => handleIncrement(dish.itemid, e)}
                                                className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        searchInput && (
                                            <button
                                                onClick={(e) => handleAdd(dish, e)}
                                                className="w-full py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                                            >
                                                ADD
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {showModal && (
                <ConfirmationalModal
                    modalData={{
                        text1: "Ordering from multiple canteens is not supported",
                        text2: "Your cart will be reset if you want to add this item. Proceed?",
                        btn1Text: "Yes",
                        btn2Text: "No",
                        btn1Handler: handleModalConfirm,
                        btn2Handler: handleModalCancel,
                    }}
                />
            )}
        </div>
    );
}

export default Explore;
