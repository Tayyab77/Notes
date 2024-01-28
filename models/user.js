import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
       name: {
        type: String,
        required: true,
       
    },
     email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
},
   {timestamps: true}
);

//Its creating User table in mongoose and in OR its checking if its already created
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;