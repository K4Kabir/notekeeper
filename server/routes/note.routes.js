import { Auth } from "../libs/Auth.js";
import express from "express";
import bodyParser from "body-parser";
import {
  addtoFav,
  createNote,
  deleteNote,
  getById,
  getNotes,
  searchNote,
  updateNote,
} from "../controller/NoteController.js";
import multerUpload from "../middleware/multer.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/create", multerUpload.single("Image"), Auth, createNote);
router.get("/getAll", Auth, getNotes);
router.put("/update", Auth, updateNote);
router.get("/getById/:id", Auth, getById);
router.delete("/deleteNote/:id", Auth, deleteNote);
router.put("/addtoFav/:id", Auth, addtoFav);
router.get("/search/:input", Auth, searchNote);

export default router;
