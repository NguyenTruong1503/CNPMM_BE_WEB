import mongoose from "mongoose";
import pkg from "mongoose-sequence";
const AutoIncrement = pkg(mongoose);

const favoriteBookSchema = new mongoose.Schema(
  {
    favoriteId: {
      type: Number,
      unique: true,
    },
    accountId: {
      type: Number,
      required: true,
    },
    bookId: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

favoriteBookSchema.plugin(AutoIncrement, {
  inc_field: "favoriteId",
  start_seq: 1,
});
export const FavoriteBook = mongoose.model("FavoriteBook", favoriteBookSchema);
