import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import ConfirmationalModal from '../components/common/ConfirmationalModal';

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
    const [allDishes, setAllDishes] = useState([]);
    const [canteens, setCanteens] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [filteredCanteens, setFilteredCanteens] = useState([]);
    const [searchType, setSearchType] = useState('dishes');
    const [quantities, setQuantities] = useState({});
    const [currentCanteen, setCurrentCanteen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pendingItem, setPendingItem] = useState(null);

    const userData = useSelector(store => store.user);

    useEffect(() => {
        fetchPopularDishes();
        fetchCanteens();
    }, []);

    const fetchPopularDishes = async () => {
        const dishes = [
            { id: 1, name: 'Pizza', image: 'pizza.jpg', canteen: 'Raj Canteen' },
            { id: 2, name: 'Burger', image: 'burger.jpg', canteen: 'Chechi Canteen' },
            { id: 3, name: 'Burger Pizza', image: 'burgerPizza.jpg', canteen: 'Chechi Canteen' },
            { id: 4, name: 'Maggie', image: 'maggie.jpg', canteen: 'Tirath Canteen' },
            { id: 5, name: 'Egg Maggie', image: 'eggMaggie.jpg', canteen: 'Tirath Canteen' },
            { id: 6, name: 'Paneer Paratha', image: 'paneerParatha.jpg', canteen: 'Raj Canteen' },
            { id: 7, name: 'Egg Maggie', image: 'eggMaggie.jpg', canteen: 'Chechi Canteen' },
        ];
        setPopularDishes(dishes.slice(0, 4));
        setAllDishes(dishes);
    };

    const fetchCanteens = async () => {
        const canteensData = [
            { id: 1, name: 'Raj Canteen', description: 'Best in pizza and burgers', featuredDish: 'Pizza', image: 'canteenA.jpg' },
            { id: 2, name: 'Chechi Canteen', description: 'Famous for fresh sandwiches', featuredDish: 'Burger', image: 'canteenB.jpg' },
            { id: 3, name: 'Tirath Canteen', description: 'Famous for desi dishes', featuredDish: 'Maggie', image: 'canteenC.jpg' },
        ];
        setCanteens(canteensData);
    };

    useEffect(() => {
        if (searchInput) {
            filterResults(searchInput, searchType);
        } else {
            setFilteredDishes([]);
            setFilteredCanteens([]);
        }
    }, [searchType]);

    const filterResults = (input, type) => {
        const lowerCaseInput = input.toLowerCase();
    
        if (type === 'dishes') {
            const exactMatches = allDishes.filter(dish =>
                dish.name.toLowerCase() === lowerCaseInput
            );
            const partialMatches = allDishes.filter(dish =>
                dish.name.toLowerCase().includes(lowerCaseInput) && dish.name.toLowerCase() !== lowerCaseInput
            );
            setFilteredDishes([...exactMatches, ...partialMatches]);
        } else if (type === 'canteens') {
            const exactMatches = canteens.filter(canteen =>
                canteen.name.toLowerCase() === lowerCaseInput
            );
            const partialMatches = canteens.filter(canteen =>
                canteen.name.toLowerCase().includes(lowerCaseInput) && canteen.name.toLowerCase() !== lowerCaseInput
            );
            setFilteredCanteens([...exactMatches, ...partialMatches]);
        }
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setShowSearchOptions(true);
        filterResults(value, searchType);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setShowSearchOptions(false);
        setFilteredDishes([]);
        setFilteredCanteens([]);
    };

    const handleAdd = (dish) => {
        const cartIsEmpty = Object.keys(quantities).length === 0;
    
        if (!cartIsEmpty && currentCanteen && currentCanteen !== dish.canteen) {
            setPendingItem(dish);
            setShowModal(true);
        } else {
            setCurrentCanteen(dish.canteen);
            setQuantities(prevQuantities => ({ ...prevQuantities, [dish.id]: 1 }));
        }
    };

    const handleIncrement = (id) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
    };

    const handleDecrement = (id) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            if (newQuantities[id] > 1) {
                newQuantities[id]--;
            } else {
                delete newQuantities[id];
            }
    
            // Check if the cart is empty after decrement
            if (Object.keys(newQuantities).length === 0) {
                setCurrentCanteen(null);
            }
    
            return newQuantities;
        });
    };

    const handleModalConfirm = () => {
        setQuantities({ [pendingItem.id]: 1 });
        setCurrentCanteen(pendingItem.canteen);
        setPendingItem(null);
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setPendingItem(null);
        setShowModal(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const renderDishCard = (dish) => (
        <div key={dish.id} className="bg-[#31363F] p-4 rounded-lg shadow-lg">
            <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
            <p className="text-gray-400 mb-4">Available at: {dish.canteen}</p>
            {quantities[dish.id] ? (
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={() => handleDecrement(dish.id)}
                        className="px-10 py-1 bg-red-500 text-white rounded-lg"
                    >
                        -
                    </button>
                    <span>{quantities[dish.id]}</span>
                    <button
                        onClick={() => handleIncrement(dish.id)}
                        className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleAdd(dish)}
                    className="w-full py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                >
                    ADD
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white relative z-0">
        <div className="mb-6 relative z-10 mt-12 pt-10 flex justify-center">
            <div className="relative w-6/12">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearchOptions(true)}
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
        </div>
        {showSearchOptions && (
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
                            <div key={canteen.id} className="bg-[#31363F] p-4 rounded-lg shadow-lg flex items-center">
                                <img src={canteen.image} alt={canteen.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{canteen.name}</h3>
                                    <p className="text-gray-400 mb-2">{canteen.description}</p>
                                    <p className="text-gray-400">Featured Dish: {canteen.featuredDish}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {!showSearchOptions && (
            <div className="mb-10">
                <h2 className="ml-6 text-2xl font-bold mb-4">Popular Dishes</h2>
                <Slider {...settings} className="mx-4">
                    {popularDishes.map(dish => (
                        <div key={dish.id} className="px-2">
                            <div className="bg-[#31363F] p-4 rounded-lg shadow-lg">
                                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                                <p className="text-gray-400 mb-4">Available at: {dish.canteen}</p>
                                {quantities[dish.id] ? (
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={() => handleDecrement(dish.id)}
                                            className="px-10 py-1 bg-red-500 text-white rounded-lg"
                                        >
                                            -
                                        </button>
                                        <span>{quantities[dish.id]}</span>
                                        <button
                                            onClick={() => handleIncrement(dish.id)}
                                            className="px-10 py-1 bg-[#76ABAE] text-white rounded-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAdd(dish)}
                                        className="w-full py-2 font-extrabold bg-[#76ABAE] text-white rounded-lg"
                                    >
                                        ADD
                                    </button>
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
