import bodyParser from "body-parser";
import express from "express";
import {
  login,
  register,
  getMyProfile,
  logout,
} from "../controller/UserController.js";
import { Auth } from "../libs/Auth.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/register", register);
router.post("/login", login);
router.post("/me", Auth, getMyProfile);
router.post("/logout", logout);

export default router;
