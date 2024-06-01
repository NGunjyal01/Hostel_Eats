import React, { useState } from 'react';

const Add_CanteenO = () => {
  const [canteenFormData,setCanteenFormData]=useState({canteenName:'',canteenContact:'',address:'',ownerContact:'',ownerName:'',ownerEmail:'',licenseNumber:''});
  
  const handleOnChange=(input)=>{
    if(input.name==='canteenContact' || input.name==='ownerContact'){
      if(input.value.length<=10){
        setCanteenFormData({...canteenFormData,[input.name]:input.value});
      }
    }else{
        setCanteenFormData({...canteenFormData,[input.name]:input.value});
    }
    console.log(canteenFormData);
  }

  const handleNext = () => {

  };

  return (
    <div className="text-white flex justify-center items-center p-10 w-full">
      <div className="bg-[#222831] p-10 rounded-md shadow-md w-[70%] max-w-lg">
        <h1 className="text-2xl mb-4 font-bold">Canteen Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Canteen Name</label>
            <input
              type="text"
              placeholder='Name of Canteen'
              name='canteenName'
              value={canteenFormData.canteenName}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Canteen Contact Number</label>
            <div className='flex'>
            <span className="bg-[#31363F] inline-flex items-center px-3 rounded-l-md text-white text-sm">+91</span>
            <input
              type="text"
              placeholder='Contact Number'
              name='canteenContact'
              value={canteenFormData.canteenContact}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-r-md"
            />
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-bold mb-2">Canteen Address</label>
            <input
              type="text"
              placeholder='Canteen Address'
              name='address'
              value={canteenFormData.address}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-md"
            />
          </div>

          

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Owner Contact Number</label>
            <div className="flex">
              <span className="bg-[#31363F] inline-flex items-center px-3 rounded-l-md text-white text-sm">+91</span>
              <input
                type="text"
                placeholder='Contact Number'
                name='ownerContact'
                value={canteenFormData.ownerContact}
                onChange={(e) => { handleOnChange(e.target) }}
                className="bg-[#31363F] w-full px-3 py-2 text-black rounded-r-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Owner Name</label>
            <input
              type="text"
              placeholder='Owner Name'
              name='ownerName'
              value={canteenFormData.ownerName}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-md"
            />
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-bold mb-2">Owner Email</label>
            <input
              type="email"
              placeholder='Owner Email'
              name='ownerEmail'
              value={canteenFormData.ownerEmail}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-md"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-bold mb-2">License Number</label>
            <input
              type="text"
              placeholder='License Number'
              name='licenseNumber'
              value={canteenFormData.licenseNumber}
              onChange={(e) => { handleOnChange(e.target) }}
              className="bg-[#31363F] w-full px-3 py-2 text-black rounded-md"
            />
          </div>

        </div>

        <button
          onClick={handleNext}
          className="bg-[#76ABAE] hover:bg-[#43777a] text-white font-bold py-2 px-4 rounded w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Add_CanteenO