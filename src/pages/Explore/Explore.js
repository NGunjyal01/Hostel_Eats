// Explore.js
import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import ConfirmationalModal from "../../components/common/ConfirmationalModal";
import {
  searchItem,
  getPopularDishes,
  getCanteenPageDetails,
  addCartItem,
  removeCartItem,
  resetCartItem,
} from "../../services/customerAPI";
import { useNavigate } from "react-router-dom";
import { setCanteensData } from "../../slices/canteenPageSlice";
import DishCard from "./DishCard";
import Pagination from "../../components/common/Pagination";
import { formatTime } from "../../utils/formatTime";
import { resetPagination, setPagination } from "../../slices/paginationSlice";
import Shimmer from "../../components/common/Shimmer";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#76ABAE]"
      style={{ fontSize: "1.75em"}}
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
      style={{ fontSize: "1.75em" }}
      onClick={onClick}
    >
      <FaRegArrowAltCircleRight />
    </div>
  );
};

const Explore = () => {
  const cart = useSelector((store) => store.cart);
  const cartItemMap = !cart
    ? new Map()
    : new Map(cart.items?.map((item) => [item.item._id, item.quantity]));

  const [searchInput, setSearchInput] = useState("");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [filteredCanteens, setFilteredCanteens] = useState([]);
  const [searchType, setSearchType] = useState("dishes");
  const [showModal, setShowModal] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);
  // const [currentItems, setCurrentItems] = useState([]);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popularDishes = useSelector((state) => state.popularDishes);
  const paginationData = useSelector(store => store.pagination);
  const { allItems,currentItems,itemsPerPage,currentPageNo } = paginationData;

  useEffect(() => {
    const savedSearchInput = localStorage.getItem("searchInput");
    const savedFilteredDishes = localStorage.getItem("filteredDishes");
    const savedFilteredCanteens = localStorage.getItem("filteredCanteens");
    const savedShowSearchOptions = localStorage.getItem("showSearchOptions");

    if (savedSearchInput) setSearchInput(savedSearchInput);
    if (savedFilteredDishes) {
      const dishes = JSON.parse(savedFilteredDishes);
      setFilteredDishes(dishes);
      // setCurrentItems(dishes.slice(0, 9)); // Initialize currentItems with first page items
      console.log("dishes====>",dishes)
      dispatch(setPagination({
        allItems: dishes,
        currentItems: dishes.slice(0, 9),
        currentPageNo: 1,
        itemsPerPage: 9,
        scrollTo: "search-input"
      }));
    }
    if (savedFilteredCanteens)
      setFilteredCanteens(JSON.parse(savedFilteredCanteens));
    if (savedShowSearchOptions)
      setShowSearchOptions(JSON.parse(savedShowSearchOptions));

    return ()=>{
      dispatch(resetPagination());
      localStorage.removeItem('pagination');
    }
  }, []);

  const filterResults = async (input) => {
    setLoadingResults(true);
    const lowerCaseInput = input.toLowerCase();
    const formData = {
      itemName: lowerCaseInput,
    };
    let dishResult;
    try {
      dishResult = await searchItem(formData);
      const allMatches = dishResult.items;
      console.log("All matches====>",allMatches)
      if (allMatches.length > 0) {
        setFilteredDishes(allMatches);
        dispatch(setPagination({
          allItems: allMatches,
          currentItems: allMatches.slice(0, 9),
          currentPageNo: 1,
          itemsPerPage: 9,
          scrollTo: "search-input"
        }));
        localStorage.setItem("filteredDishes", JSON.stringify(allMatches));
      } else {
        setFilteredDishes([]);
        dispatch(resetPagination());
        localStorage.setItem("filteredDishes", JSON.stringify([]));
      }
  
      if (dishResult.canteens && dishResult.canteens.length > 0) {
        setFilteredCanteens(dishResult.canteens);
        localStorage.setItem("filteredCanteens", JSON.stringify(dishResult.canteens));
      } else {
        setFilteredCanteens([]);
        localStorage.setItem("filteredCanteens", JSON.stringify([]));
      }
  
      dispatch(setCanteensData(dishResult.canteens));
    } catch (error) {
      console.error("Error searching for items:", error);
    setFilteredDishes([]);
    setFilteredCanteens([]);
    dispatch(resetPagination());
    localStorage.setItem("filteredDishes", JSON.stringify([]));
    localStorage.setItem("filteredCanteens", JSON.stringify([]));
    }
    setLoadingResults(false);
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
      localStorage.setItem("searchInput", searchInput);
      localStorage.setItem("showSearchOptions", JSON.stringify(true));
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setShowSearchOptions(false);
    setFilteredDishes([]);
    setFilteredCanteens([]);
    localStorage.removeItem("searchInput");
    localStorage.removeItem("filteredDishes");
    localStorage.removeItem("filteredCanteens");
    localStorage.removeItem("showSearchOptions");
    dispatch(resetPagination());
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
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
          top: "30px",
          width: "100%", // Ensure container width is 100%
          overflow: "hidden", // Hide overflow to avoid extra lines
          whiteSpace: "nowrap", // Ensure the dots stay in one line
          display: "flex",
          justifyContent: "center", // Center dots
        }}
      >
        <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#76ABAE",
          borderRadius: "50%",
          display: "inline-block",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen p-6 text-white relative z-0">
      <form
        id="search-input"
        onSubmit={handleSearchSubmit}
        className="mb-6 relative z-10 mt-12 pt-10 flex justify-center"
      >
        <div className="relative w-full sm:w-8/12 md:w-6/12 lg:w-6/12">
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
        <div className="mb-6 w-full sm:w-8/12 md:w-6/12 lg:w-6/12 mx-auto">
          <div className="space-x-4">
            <button
              className={`py-2 px-4 rounded-lg ${
                searchType === "dishes" ? "bg-gray-700" : "bg-gray-500"
              }`}
              onClick={() => setSearchType("dishes")}
            >
              Dishes
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${
                searchType === "canteens" ? "bg-gray-700" : "bg-gray-500"
              }`}
              onClick={() => setSearchType("canteens")}
            >
              Canteens
            </button>
          </div>
        </div>
      )}

      {showSearchOptions && searchInput && (
        <div className="w-full sm:w-6/12 mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4">
            {searchType === "dishes"
              ? "Search Results for Dishes"
              : "Search Results for Canteens"}
          </h2>
          {loadingResults ? (
            <Shimmer type="explore" />
          ) : (
          searchType === "dishes" ? (
            <>
              {paginationData.currentItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginationData.currentItems.map((dish) => (
              <DishCard
                key={dish.itemid}
                dish={dish}
                setShowModal={setShowModal}
                cartItemMap={cartItemMap}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination/>
          </div>
        </div>
            ) : (
              <div className="text-center sm:mt-32 sm:text-4xl font-bold text-white">No dishes found</div>
            )}
          </>
          ) : (
            <div className="space-y-6">
              {filteredCanteens.map((canteen) => (
                <div
                  key={canteen.shopid}
                  className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer flex flex-col md:flex-row justify-between items-center md:items-start"
                  onClick={() => handleCardClick(canteen.shopid)}
                >
                  <div className="text-center lg:text-left lg:flex-grow">
                    <h3 className="text-2xl font-semibold mb-2 lg:mb-4">
                      {canteen.canteenName}
                    </h3>
                    <p className="sm:text-lg text-md text-gray-400 font-semibold mb-2 lg:mb-4">
                      Opening Time: {formatTime(canteen.openingTime)}
                    </p>
                    <p className="sm:text-lg text-md text-gray-400 font-semibold mb-2 lg:mb-4">
                      Closing Time: {formatTime(canteen.closingTime)}
                    </p>
                    <p className="sm:text-lg text-md text-gray-400 font-semibold">
                      {canteen.status}
                    </p>
                  </div>
                  <img
                    src={canteen.imageUrl}
                    alt={canteen.canteenName}
                    className="w-full lg:w-80 h-48 object-cover rounded-lg mt-4 lg:mt-0 lg:ml-4"
                  />
                </div>
              ))}
            </div>
            )
          )}
        </div>
      )}
      {!searchInput && (
        <div className="mt-[15%] sm:mt-0 sm:mb-10 sm:mt-18 sm:ml-8 md:mt-15 md:ml-2 px-4 sm:px-10">
          <h2 className="text-xl sm:text-3xl lg:text-4xl sm:ml-5 mb-10 text-center sm:text-left">
            Popular Dishes
          </h2>
          <div className="relative max-w-full mx-auto">
          <Slider {...settings} className="mx-4">
            {popularDishes.map((dish) => (
              <div key={dish._id} className="px-2 w-full sm:w-auto">
                <div
                  className="bg-[#31363F] p-2 sm:p-4 rounded-lg shadow-lg cursor-pointer h-72 sm:h-80 flex flex-col justify-between"
                  onClick={() => handleCardClick(dish.shopid)}
                >
                  <div className="relative">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-36 object-cover rounded-lg pb-2"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">{dish.name}</h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-2">
                      Available at: {dish.canteenName}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base mb-2">Price: ₹{dish.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
        </div>
      )}

      {showModal && <ConfirmationalModal modalData={showModal}/>}
    </div>
  );
};

export default Explore;