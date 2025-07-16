import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema({
    userCount: Number,
    amountLeveraged: Number,
}, { timestamps: true });

const Metrics = mongoose.model("Metrics", metricsSchema);

export default Metrics;

