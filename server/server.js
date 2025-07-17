import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Users from "./models/users.js";
import LeveragePositions from "./models/leveragePoistions.js";
import cron from "node-cron";
import Metrics from "./models/metrics.js";

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/dashboard")
  .then(console.log("CONNECTED TO MONGO"))
  .catch((e) => {
    console.log("error connecting");
  });

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", async (req, res) => {
  const { address } = req.body;
  const newUser = new Users({ address });
  await newUser.save();
  res.send("new user created", newUser);
});

app.post("/leverage/open", async (req, res) => {
  const { id, owner, collateralToken, loanToken, amountCollateral, open } = req.body;
  const newLevergePosition = new LeveragePositions({
    id,
    owner,
    collateralToken,
    loanToken,
    amountCollateral,
    open,
  });
  await newLevergePosition.save();
  res.send("new leverage position opened", newLevergePosition);
});

const updateMetrics = async () => {
  const userCount = (await Users.find()).length;
  let amountLeveraged = 0;
  const leveragePositions = await LeveragePositions.find({});
  leveragePositions.forEach((position) => {
    amountLeveraged += position.amountCollateral*7.4;
  });

  const newMetric = new Metrics({userCount, amountLeveraged});
  newMetric.save()
};

const scheduleCron = () => {
  cron.schedule("* * * * *", () => {
    updateMetrics();
  });
};

app.put("/leverage/close", async (req, res) => {
  const { id } = req.body;
  try {
    const closeLeveragePoistion = await LeveragePositions.findOneAndUpdate(
      { id: id },
      { $set: { open: false } },
      { new: true }
    );

    if (!closeLeveragePoistion) {
      return res.status(404).send("leveragePoasition not found");
    }
    res.send(closeLeveragePoistion);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/leveragePositions", async (req, res) => {
  try {
    const leveragePoistions = await LeveragePositions.find().sort({
      amountCollateral: -1,
    });

    if (!leveragePoistions) {
      return res.status(404).send("there are no leverage positions");
    }
    res.send(leveragePoistions);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/metrics" , async(req,res) => {
  const metrics  = await Metrics.find();
  res.send(metrics);
})

app.listen(5000, () => {
  console.log("Serving on port 5000");
  scheduleCron();
});
