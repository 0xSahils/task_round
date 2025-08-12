import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      maxlength: [5000, "Content cannot be more than 5000 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [20, "Tag cannot be more than 20 characters"],
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ title: "text", content: "text" });

noteSchema.methods.isOwnedBy = function (userId) {
  return this.user.toString() === userId.toString();
};

export default mongoose.model("Note", noteSchema);
