import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    'address': String,
})

const Users = mongoose.model("Users",userSchema);

export default Users;