import mongoose, { Types } from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    User: { type: Types.ObjectId, ref: "User" },
    Image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
