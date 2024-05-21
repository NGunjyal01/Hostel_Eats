import MaggieImg from "../Maggie.png"

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-black to-[#222831] text-white px-20 py-14">
           {/* Section 1 */}
            <div className="-mb-40">
                <div className="ml-10 mt-14 font-serif">
                    <h1 className='text-4xl '>Welcome To Hostel Eats</h1>
                    <p className="mt-10">Made for MNNIT Students to order food</p>
                    <button className="bg-[#EEEEEE] text-black px-4 py-2 rounded-lg mt-20">Order Now →</button>
                </div>
                <img src={MaggieImg} alt="Main Logo" className="w-[55%] relative top-0 -mt-[42%] ml-[48%]"/>
            </div>
            {/* Section 2 */}
            <div className="mb-16">
                <h1 className="text-4xl">Popular Dishes</h1>
            </div>
        </div>
        
    )
}

export default Home
