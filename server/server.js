import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Users from "./models/users.js";
import LeveragePositions from "./models/leveragePoistions.js";

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/dashboard').then(console.log("CONNECTED TO MONGO")).catch(e=>{console.log("error connecting")});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", async(req,res) => {
    const newUser = new Users(req.body);
    await newUser.save(); 
    res.send("new user created",newUser);
})

app.post("/leverage/open", async (req,res) => {
    const newLevergePosition = new LeveragePositions(req.body);
    await newLevergePosition.save();
    res.send("new leverage position opened",newLevergePosition)
})

app.put("/leverage/close" , async(req,res) => {
    const {id} = req.body;
    try{
        const closeLeveragePoistion  = await LeveragePositions.findOneAndUpdate({id:id},{$set:{open:false}},{new:true})

        if(!closeLeveragePoistion){
            return res.status(404).send("leveragePoasition not found")
        }
        res.send(closeLeveragePoistion);
    }catch (error){
       res.status(500).send(error);
    }
})

app.get("/leveragePositions", async(req,res) => {
  try{
    const leveragePoistions = await LeveragePositions.find().sort({amountCollateral: -1});

    if(!leveragePoistions){
        return res.status(404).send("there are no leverage positions")
    }
    res.send(leveragePoistions)
  }catch(error){
    res.status(500).send(error)
  }
})

app.listen(5000,()=>{console.log("Serving on port 5000")});