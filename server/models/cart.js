const mongoose=require("mongoose");
const { schema } = require("./merchant");

const cartSchema=new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    items:[{
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MenuItem",
        },
        quantity:{
            type:Number,
            default:1,
        }
      }],

    totalPrice:{
        type:Number,
        default:0,
      }
})


const CartModel=mongoose.model("Cart",cartSchema);

module.exports=CartModel;
