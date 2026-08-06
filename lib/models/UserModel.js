import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["attendee", "organizer", "admin"],
    default: "attendee",
  },
});

const UserModel = mongoose.models.user || mongoose.model("user", Schema);

export default UserModel;