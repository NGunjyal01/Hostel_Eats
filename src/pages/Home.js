import React, { useState, useEffect } from "react";
import MaggieImg from "../Maggie.png";
import {
  getPopularDishes,
  getCanteenPageDetails,
  getPopularCanteens,
} from "../services/customerAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils/formatTime";
import Shimmer from '../components/common/Shimmer';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-10 text-[#76ABAE]"
      style={{ fontSize: "1.75em", left: "-32px" }}
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
      className="absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-10 text-[#76ABAE]"
      style={{ fontSize: "1.75em", right: "-32px" }}
      onClick={onClick}
    >
      <FaRegArrowAltCircleRight />
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popularDishes = useSelector((state) => state.popularDishes);
  const [popularCanteens, setPopularCanteens] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [loadingCanteens, setLoadingCanteens] = useState(true);

  useEffect(() => {
    const fetchPopularDishes = async () => {
      setLoadingDishes(true);
      await getPopularDishes(dispatch);
      setLoadingDishes(false);
    };
  
    const fetchPopularCanteens = async () => {
      setLoadingCanteens(true);
      const canteens = await getPopularCanteens();
      setPopularCanteens(canteens);
      setLoadingCanteens(false);
    };
  
    fetchPopularDishes();
    fetchPopularCanteens();
  }, []);
  console.log("home=>", popularDishes);
  const fetchPopularCanteens = async () => {
    const canteens = await getPopularCanteens();
    setPopularCanteens(canteens);
  };

  const handleCardClick = (canteenId) => {
    navigate(`/canteen/${canteenId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
    <div className="bg-gradient-to-r from-black to-[#222831] text-white py-14">
      {/* Section 1 */}
      <div className="mt-[25%] sm:mt-[18%] md:mt-[15%] lg:mt-[12%] ml-[8%] sm:ml-[8%] md:ml-[10%]">
        <div className="relative font-serif">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">
            Welcome To Hostel Eats
          </h1>
          <p className="mt-5 md:mt-10 text-xs sm:text-xs md:text-sm lg:text-base">
            Made for MNNIT Students to order food
          </p>
          <button onClick={()=>navigate('/explore')}
          className="bg-[#76ABAE] text-black text-sm md:text-base px-4 py-2 rounded-lg mt-10 md:mt-20 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            Order Now →
          </button>
        </div>
        <img
          src={MaggieImg}
          alt="Main Logo"
          className="hidden sm:flex relative sm:w-[45%] md:w-[50%] lg:w-[45%] sm:ml-[53%] md:ml-[47%] lg:ml-[47%] sm:-mt-[36%] md:-mt-[37%] lg:-mt-[27%]"
        />
      </div>

      {/* Section 2 */}
      <div className="mt-12 ml-4 sm:mt-18 sm:ml-8 md:mt-15 md:ml-2 px-4 sm:px-10">
        <h1 className="text-xl sm:text-3xl lg:text-4xl mb-5 text-center sm:text-left">
          Popular Dishes
        </h1>
        <div className="relative max-w-full mx-auto">
        {loadingDishes ? (
            <Shimmer type="dish" />
          ) : (
          <Slider {...settings} className="mx-4">
            {popularDishes?.map((dish) => (
              <div key={dish._id} className="px-2 w-full sm:w-auto">
                <div
                  className="bg-[#31363F] p-2 sm:p-4 rounded-lg shadow-lg cursor-pointer h-72 sm:h-80 flex flex-col justify-between"
                  onClick={() => handleCardClick(dish.shopid)}
                >
                  <div className="relative">
                    <img
                      src={dish.imageUrl}
                      alt={dish.itemName}
                      className="w-full h-36 object-cover rounded-lg pb-2"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">
                      {dish.name}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-2">
                      Available at: {dish.canteenName}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base mb-2">
                      Price: ₹{dish.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          )}
        </div>
      </div>

      {/* Popular Canteens Section */}
      <div className="mt-12 ml-4 sm:mt-18 sm:ml-8 md:mt-15 md:ml-2 px-4 sm:px-10">
        <h1 className="text-xl sm:text-3xl lg:text-4xl mb-5 text-center sm:text-left">
          Popular Canteens
        </h1>
        <div className="relative max-w-full mx-auto">
        {loadingCanteens ? (
            <Shimmer type="canteen" />
        ) : (
        <Slider {...settings2} className="mx-4">
          {popularCanteens?.map((canteen) => (
            <div key={canteen._id} className="px-2 w-full sm:w-auto">
              <div
                className="bg-[#31363F] p-2 sm:p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between"
                onClick={() => handleCardClick(canteen._id)}
              >
                <div className="relative">
                  <img
                    src={canteen.imageUrl}
                    alt={canteen.canteenName}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 break-words">
                    {canteen.canteenName}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-2">
                    Opening Time: {formatTime(canteen.openingTime)}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base mb-2">
                    Closing Time: {formatTime(canteen.closingTime)}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base mb-2">
                    Address: {canteen.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
