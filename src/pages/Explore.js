import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Explore = () => {
    const [searchInput, setSearchInput] = useState('');
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [popularDishes, setPopularDishes] = useState([]);
    const [canteens, setCanteens] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [filteredCanteens, setFilteredCanteens] = useState([]);
    const [searchType, setSearchType] = useState('dishes'); 

    const userData = useSelector(store => store.user);

    useEffect(() => {
        fetchPopularDishes();
        fetchCanteens();
    }, []);

    const fetchPopularDishes = async () => {
        const dishes = [
            { id: 1, name: 'Pizza', image: 'pizza.jpg', canteen: 'Raj Canteen' },
            { id: 2, name: 'Burger', image: 'burger.jpg', canteen: 'Chechi Canteen' },
        ];
        setPopularDishes(dishes);
    };

    const fetchCanteens = async () => {
        const canteensData = [
            { id: 1, name: 'Raj Canteen', description: 'Best in pizza and burgers', featuredDish: 'Pizza', image: 'canteenA.jpg' },
            { id: 2, name: 'Chechi Canteen', description: 'Famous for fresh sandwiches', featuredDish: 'Burger', image: 'canteenB.jpg' },
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
        if (type === 'dishes') {
            const filtered = popularDishes.filter(dish => dish.name.toLowerCase().includes(input.toLowerCase()));
            setFilteredDishes(filtered);
        } else {
            const filtered = canteens.filter(canteen => canteen.featuredDish.toLowerCase().includes(input.toLowerCase()));
            setFilteredCanteens(filtered);
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
                            {filteredDishes.map(dish => (
                                <div key={dish.id} className="bg-[#31363F] p-4 rounded-lg shadow-lg">
                                    <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                                    <p className="text-gray-400">Available at: {dish.canteen}</p>
                                </div>
                            ))}
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
                    <h2 className="text-2xl font-bold mb-4">Popular Dishes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularDishes.map(dish => (
                            <div key={dish.id} className="bg-[#31363F] p-4 rounded-lg shadow-lg">
                                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                                <p className="text-gray-400">Available at: {dish.canteen}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Explore;
