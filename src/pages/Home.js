import React, { useState, useEffect } from 'react';
import MaggieImg from "../Maggie.png"
import { getPopularDishes, getCanteenPageDetails } from '../services/customerAPI';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#76ABAE]"
            style={{ fontSize: '2em', left: '-35px' }}  
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#76ABAE]"
            style={{ fontSize: '2em', right: '-35px' }}  
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
    useEffect(() => {
        getPopularDishes(dispatch); 
    }, []);
    console.log("home=>",popularDishes)

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
        appendDots: dots => (
            <div
                style={{
                    position: "relative",
                    top: "30px"
                }}
            >
                <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#76ABAE",
                    borderRadius: "50%",
                    display: "inline-block"
                }}
            ></div>
        ),
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
    return (
        <div className="bg-gradient-to-r from-black to-[#222831] text-white py-14">
           {/* Section 1 */}
            <div className="mt-[25%] sm:mt-[18%] md:mt-[15%] lg:mt-[12%] ml-[8%] sm:ml-[8%] md:ml-[10%]">
                <div className="relative font-serif">
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl'>Welcome To Hostel Eats</h1>
                    <p className="mt-5 md:mt-10 text-xs sm:text-xs md:text-sm lg:text-base">Made for MNNIT Students to order food</p>
                    <button className="bg-[#76ABAE] text-black text-sm md:text-base px-4 py-2 rounded-lg mt-10 md:mt-20 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Order Now →</button>
                </div>
                <img src={MaggieImg} alt="Main Logo" className="hidden sm:flex relative sm:w-[45%] md:w-[50%] lg:w-[45%] sm:ml-[53%] md:ml-[47%] lg:ml-[47%] sm:-mt-[36%] md:-mt-[37%] lg:-mt-[27%]"/>
            </div>
            {/* Section 2 */}
            <div className="mt-[15%] sm:mt-[18%] md:mt-[15%] lg:mt-[12%] ml-[8%] sm:ml-[8%] md:ml-[2%] px-10">
                <h1 className="text-2xl px-6 mb-5 sm:text-3xl lg:text-4xl">Popular Dishes</h1>
                <Slider {...settings} className="mx-4">
                    {popularDishes.map(dish => (
                        <div key={dish._id} className="px-2">
                            <div className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between" onClick={() => handleCardClick(dish.shopid)}>
                                <div className="relative">
                                    <img src={dish.imageUrl} alt={dish.itemName} className="w-full h-36 object-cover rounded-lg mb-4" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                                    <p className="text-gray-400 mb-2">Available at: {dish.canteenName}</p>
                                    <p className="text-gray-400 mb-2">Price: ₹{dish.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        
    )
}

export default Home