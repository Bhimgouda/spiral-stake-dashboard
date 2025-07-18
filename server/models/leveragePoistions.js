import mongoose from "mongoose";

const leveragePositionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  amountCollateralInUsd: { type: Number, required: true },
  //   id: { type: Number, required: true },
  //   collateralToken: { type: String, required: true },
  //   loanToken: { type: String, required: true },
  //   open: { type: Boolean, required: true },
});

const LeveragePositions = mongoose.model("LeveragePositions", leveragePositionSchema);

export default LeveragePositions;
