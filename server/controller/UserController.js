import User from "../model/User.js";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register =
  ("/register",
  async (req, res) => {
    const { image, username, password } = req.body;

    const check = await User.findOne({ username });

    if (check) {
      return res.status(200).send({
        message: "Please choose different Username or User already exists!",
        success: false,
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let newUser = User.create({
          username,
          password: hash,
          image,
        });
        if (newUser) {
          return res
            .status(200)
            .send({ message: "User created Successfully", success: true });
        }
      });
    });
  });

export const login =
  ("/login",
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const check = await User.findOne({ username }, "username password");
      if (!check) {
        res.status(200).send({ message: "User not exist", success: false });
      }

      const p = await compare(password, check.password);

      if (p) {
        const token = jwt.sign({ id: check._id }, "NK");
        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).send({ message: check, token, success: true });
      } else {
        return res
          .status(200)
          .send({ message: "Invalid Credentials", success: false });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  });

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user });

    if (user) {
      return res.status(200).json({ message: user, success: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ message: "Logout Successfull", success: true });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
