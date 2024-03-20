import Note from "../model/Note.js";
import { deleteFromClodinary, uploadCloudinary } from "../libs/cloudinary.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    let obj = {
      title,
      content,
      User: req.user,
    };
    if (req.file) {
      const result = await uploadCloudinary(req.file.path);
      if (!result) {
        return res
          .status(400)
          .json({ message: "File not Uploaded", success: false });
      }
      obj.Image = {
        public_id: result?.public_id,
        url: result?.url,
      };
    }
    const note = await Note.create(obj);

    if (note) {
      return res.status(200).json({ message: "Saved", success: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId, title, content, Image, isDraft, isFavourite } = req.body;
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res
        .status(400)
        .json({ message: "Note Not found", success: false });
    }

    const update = {};
    if (title) update.title = title;
    if (content) update.content = content;
    if (Image) update.Image = Image;
    if (typeof isDraft !== "undefined") update.isDraft = isDraft;
    if (typeof isFavourite !== "undefined") update.isFavourite = isFavourite;

    await Note.updateOne({ _id: noteId }, update);

    return res
      .status(200)
      .json({ message: "Updated Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getNotes = async (req, res) => {
  try {
    const note = await Note.find({ User: req.user });
    return res.status(200).json({ message: note, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res
        .status(200)
        .json({ message: "Note not found", success: false });
    }
    return res.status(200).json({ message: note, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res
        .status(200)
        .json({ message: "Note not found", success: false });
    }
    // Delete Note from Cloudinary if available
    if (note.Image) {
      const result = await deleteFromClodinary(note.Image.public_id);
      if (result) {
        console.log("Deleted from cloud", result);
      }
    }
    const d = await Note.deleteOne({ _id: noteId });
    if (d) {
      return res.status(200).json({ message: "Deleted", success: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const addtoFav = async (req, res) => {
  try {
    const noteId = req.params.id;
    console.log(noteId);
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res
        .status(400)
        .json({ message: "Note not found", success: false });
    }

    if (note.isFavourite == true) {
      note.isFavourite = false;
      await note.save();
      return res
        .status(200)
        .json({ message: "Removed from favourite", success: true });
    }

    note.isFavourite = true;
    await note.save();
    return res
      .status(200)
      .json({ message: "Added to Favourite", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const searchNote = async (req, res) => {
  try {
    const input = req.params.input;

    let note = await Note.find({ User: req.user });

    if (input == "All") {
      return res.status(200).json({ message: note, success: true });
    }

    note = await Note.find({
      User: req.user,
      $or: [
        { title: { $regex: new RegExp(input, "i") } }, // Search by title
        { content: { $regex: new RegExp(input, "i") } }, // Search by content
      ],
    }).exec();

    return res.status(200).json({ message: note, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
