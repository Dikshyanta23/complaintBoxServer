import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  complainerName: {
    type: String,
    required: true,
  },
  complaineeName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
