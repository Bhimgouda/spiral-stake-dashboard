import mongoose from "mongoose";

const leveragePositionSchema = new mongoose.Schema({
    "id":{type:Number,required:true},
    "owner":{type:String,required:true},
    "collateralToken":{type:String,required:true},
    "loanToken":{type:String,required:true},
    "amountCollateral":{type:Number,required:true},
    "open":{type:Boolean,required:true}   
})

const LeveragePositions = mongoose.model("LeveragePositions",leveragePositionSchema);

export default LeveragePositions;