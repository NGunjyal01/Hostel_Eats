const mongoose=require("mongoose");

const favouriteSchema=new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[{
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MenuItem"
        },
        canteenName:{
            type:String,
        }
}]
})

const favouriteModel=mongoose.model("Favourite",favouriteSchema);
module.exports=favouriteModel;