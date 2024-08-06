const mongoose = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");
const Merchant = require("../models/merchant");
const Order=require("../models/order");
const Favourite=require("../models/favourite");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getCanteenStatus } = require("../utils/status");



//Search Item means Explore Page

exports.searchItem = async (req, res) => {
  try {
    const { itemName } = req.body;

    if (!itemName) {
      return res.status(200).json({
        success: false,
        message: "Please provide Item Name",
      });
    }

    const items = await Item.find({
      name: { $regex: itemName, $options: "i" },
    }).populate("shopid");

    //all the regular expression contains itemName will be fetched

    if (items.length == 0) {
      return res.status(200).json({
        success: false,
        message: `${itemName} is not found`,
      });
    }

    const expressTime = new Date();
    const currentTime = new Date(
      expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
    );
    //console.log("Current time Here:", currentTime); //Modified according to time zone

    const result = items.map((item) => {
      const openingTime = item.shopid.openingTime.toString();
      const closingTime = item.shopid.closingTime.toString();
      //Open or closed
      const status = getCanteenStatus(openingTime, closingTime, currentTime);

      return {
        itemid: item._id,
        shopid: item.shopid._id,
        itemName: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        canteenName: item.shopid.canteenName,
        imageUrl: item.imageUrl,
        status: status,
      };
    });

    const canteenResults = [...new Set(items.map((item) => item.shopid))].map(
      (canteenId) => {
        const canteen = items.find((item) => item.shopid === canteenId).shopid;
        const openingTime = canteen.openingTime.toString();
        const closingTime = canteen.closingTime.toString();
        const status = getCanteenStatus(openingTime, closingTime, currentTime);
        const itemImage = items.find(
          (item) => item.shopid === canteenId
        ).imageUrl;

        return {
          shopid: canteen._id,
          canteenName: canteen.canteenName,
          openingTime: canteen.openingTime,
          closingTime: canteen.closingTime,
          status: status,
          imageUrl: itemImage,
        };
      }
    );

    res.status(200).json({
      items: result,
      canteens: canteenResults,
      success: true,
      message: `${itemName} is found successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//Canteen Page fetch on click

exports.getCanteenDetails = async (req, res) => {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID does not satisfy mongoose criteria",
      });
    }

    const specificCanteen = await Merchant.findOne({ _id: id })
      .populate("menuitems")
      .select(
        "-ownerContact -ownerName -ownerEmail -monthlyRevenue -totalRevenue"
      );

    if (!specificCanteen) {
      return res.status(200).json({
        success: false,
        message: "Canteen Not present",
      });
    }

    const expressTime = new Date();
    const currentTime = new Date(
      expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
    );
    //console.log("Current time Here:", currentTime); //Modified according to time zone
    const openingTime = specificCanteen.openingTime.toString();
    const closingTime = specificCanteen.closingTime.toString();
    const status = getCanteenStatus(openingTime, closingTime, currentTime);
    const canteenDetails = specificCanteen.toObject();
    canteenDetails.status = status; //adding status of canteen

    res.status(200).json({
      data: canteenDetails,
      success: true,
      message: `${specificCanteen.canteenName} full Details`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//Add to Cart

exports.addItemToCart = async (req, res) => {
  try {
    const payload = req.user;
    const { itemid} = req.body;
    const quantity=1;

    let cart = await Cart.findOne({ userid: payload.id }).populate(
      "items.item"
    );

    //cart not present
    if (!cart) {
      cart = new Cart({ userid: payload.id, items: [] });
    }

    const item = await Item.findById({ _id: itemid });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Ensure all items in the cart are from the same canteen
    if (cart.items.length > 0 &&item.shopid.toString() !== cart.items[0].item.shopid.toString() ) {
      return res.status(400).json({
        success: false,
        message: "Adding items from different canteen is not allowed",
      });
    }

    //checking If item already pressent then update quantity

    const itemIdx = cart.items.findIndex( (item) => item.item._id.toString() === itemid);

    if (itemIdx > -1) {
      cart.items[itemIdx].quantity += quantity;
    } else {
      cart.items.push({ item: itemid, quantity });
    }

    //calculating price:
  await cart.populate({
      path: 'items.item',
    //populate: { path: 'shopid', select: 'canteenName' }
    });

    cart.totalPrice = cart.items.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);

       cart.totalQuantity = cart.items.reduce((total, cartItem) => {
         return total + cartItem.quantity;
       }, 0);

    

    const canteen = await Merchant.findById({_id:cart.items[0].item.shopid})
     cart.toObject();
      cart.canteenName = canteen.canteenName;
await cart.save();
    res.status(200).json({
      data: cart,
      success: true,
      message: "Item Added to Cart Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//Get From Cart
exports.getItemFromCart = async (req, res) => {
  try {
    const payload = req.user;
    const cart = await Cart.findOne({ userid: payload.id }).populate(
      "items.item"
    );

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      data: cart,
      success: true,
      message: "Cart Items fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//Remove Item From Cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const payload = req.user;
    const { itemid } = req.body;

    const cart = await Cart.findOne({ userid: payload.id }).populate(
      "items.item"
    );

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "Cart is Empty",
      });
    }
    //find the item in the cart

    const itemIdx = cart.items.findIndex(
      (item) => item.item._id.toString() === itemid
    );

    if (itemIdx === -1) {
      return res.status(200).json({
        success: false,
        message: "Item Not found in cart",
      });
    }

    // Reduce the quantity by 1
    cart.items[itemIdx].quantity -= 1;
    cart.totalQuantity-=1;
    //quanity 0 then delete
    if(cart.items[itemIdx].quantity<=0){
      cart.items.splice(itemIdx,1)
    }

    if (cart.items.length === 0) {
      await Cart.deleteOne({ userid: payload.id });

      return res.status(200).json({
        success: true,
        message: "Cart is now empty and has been deleted",
      });
    }

  
    //New price of cart
    cart.totalPrice = cart.items.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
    await cart.save();

    res.status(200).json({
      data: cart,
      success: true,
      message: "Item Removed Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

exports.searchItemByCanteen =async(req,res) =>{
  try{ 
      const payload=req.user;

      const {shopid,itemName}=req.body;
      
      const canteen=await Merchant.findOne({_id:shopid});
      if(!canteen){
        return res.status(200).json({
          success:false,
          message:"canteen Not Exist",
        })
      }
      await canteen.populate('menuitems');

    const searchedItems=canteen.menuitems.filter(item=>item.name.toLowerCase().includes(itemName.toLowerCase()));



    if(searchedItems.length===0){
      return res.status(200).json({
        success:false,
        message:"No items found",
      })
    }
    
    res.status(200).json({
      data: searchedItems,
      success: true,
      message: `${searchedItems.length} items found`,
    });
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something went wrong",
    })
  }
}

exports.resetCartItem = async(req,res) => {

  try{
  const payload=req.user;

  const cart= await Cart.findOne({userid:payload.id});
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }
 
  await Cart.deleteOne({userid:payload.id});

  res.status(200).json({
    success:true,
    message:"Cart is empty",
  })
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}


//getOrderDetails

exports.getOrderDetails = async (req, res) => {
  try {
    const payload = req.user;

    const orders = await Order.find({ userid: payload.id })
      .populate({
        path: "items.item",
        select: "_id shopid name description price category imageUrl",
      })
      .sort({ createdAt: -1 })
      .select("_id userid items totalAmount paymentstatus status createdAt");

    if (orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No orders found",
      });
    }
    // Fetching canteen names for each order
    const ordersWithCanteenNames = await Promise.all(
      orders.map(async (order) => {
        const shopId = order.items[0].item.shopid;
        const merchant = await Merchant.findById(shopId).select("canteenName");

        const orderObj = order.toObject();
        orderObj.canteenName = merchant ? merchant.canteenName : "Unknown";

        return orderObj;
      })
    );

    res.status(200).json({
      success: true,
      data: ordersWithCanteenNames,
      message:"Previous Order Fetched successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


//Add FavouriteItem
exports.addFavouriteItem =async(req,res)=>{
  try{
    const payload=req.user;
    const {itemid}=req.body;

    //Find the item to get its canteenName
    const item=await Item.findById({_id:itemid}).populate('shopid');
    if(!item){
      return res.status(200).json({
        success:false,
        message:"Item Not Found",
      })
    }
    const canteenName=item.shopid.canteenName;

    let existFavourite= await Favourite.findOne({userid:payload.id});

    if(existFavourite){
      //Favourite already exist
      // Check if the item is already in the favourites
      const itemExists = existFavourite.items.some(
        (favItem) => favItem.item.toString() === itemid
      );
       if (itemExists) {
         return res.status(200).json({
           success: false,
           message: "Item already in favourites",
         });
       }
        existFavourite.items.push({ item: itemid, canteenName });
    }
    else{
      // Create a new favourites for the user
      existFavourite = new Favourite({
        userid: payload.id,
        items: [{ item: itemid, canteenName }],
      });
    }
    existFavourite.populate("items.item");
     await existFavourite.save();
     res.status(200).json({
      data:existFavourite,
      success:true,
      message:"Succesfully added into favourites",
     })
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//get favouriteItem

exports.getFavouriteItems=async(req,res)=>{
  try{
    const payload=req.user;

    let existFavourite=await Favourite.findOne({userid:payload.id}).populate("items.item");
    
    if(!existFavourite){
      return res.status(200).json({
        success:false,
        message:"Favourite List is empty",
      })
    }


    return res.status(200).json({
      data:existFavourite,
      success:true,
      message:"Favourite Items fetched successfully",
    })
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong"
,    })
  }
}

//Remove favourite Item

exports.removeFavouriteItem=async(req,res)=>{
  try{
      const payload=req.user;
      const {itemid}=req.body;

      const existFavourite=await Favourite.findOne({userid:payload.id}).populate("items.item");

      if(!existFavourite){
        return res.status(200).json({
          success:false,
          message:"Favourite List is empty",
        })
      }
      
      const itemIdx=existFavourite.items.findIndex((item)=>item.item._id.toString()===itemid);

          if (itemIdx === -1) {
            return res.status(200).json({
              success: false,
              message: "Item Not found in Favourites",
            });
          }

           existFavourite.items.splice(itemIdx, 1);
           if(existFavourite.items.length===0){
             await Favourite.deleteOne({ userid: payload.id });

              return res.status(200).json({
                success: true,
                message: "Favourite List is now empty and has been deleted",
              });
           }
           //save the updated list
         existFavourite.save();

           res.status(200).json({
            data:existFavourite,
            success:true,
            message:"Item is successfully remvoed from Favourites",
           })


  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}




