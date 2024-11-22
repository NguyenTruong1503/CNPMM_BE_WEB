import mongoose from "mongoose";
import pkg from "mongoose-sequence";
const readBookSchema = new mongoose.Schema(
  {
    accountID: {
      type: Number,
      ref: "Account",
      required: true,
    },
    bookID: {
      type: Number,
      ref: "Book",
      required: true,
    },
      chapterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        default: 0,
    },
      chapter_number: {
        type: Number,
        default: 1,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export const ReadBook = mongoose.model("ReadBook", readBookSchema);
