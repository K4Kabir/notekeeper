import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
