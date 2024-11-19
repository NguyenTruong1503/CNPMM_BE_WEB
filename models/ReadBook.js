import mongoose from "mongoose";
import pkg from "mongoose-sequence";
const AutoIncrement = pkg(mongoose);
const readBookSchema = new mongoose.Schema(
  {
    readId: {
      type: Number,
      unique: true,
    },
    accountId: {
      type: Number,
      ref: "Account",
      required: true,
    },
    bookId: {
      type: Number,
      ref: "Book",
      required: true,
    },
    readStatus: {
      type: String,
      enum: ["reading", "completed", "dropped"],
      default: "reading",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
readBookSchema.plugin(AutoIncrement, { inc_field: "readId", start_seq: 1 });
export const ReadBook = mongoose.model("ReadBook", readBookSchema);
