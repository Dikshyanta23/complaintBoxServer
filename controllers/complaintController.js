import Complaint from "../models/complaintModel.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { complainerName, complaineeName, message } = req.body;

    if (!complainerName || !complaineeName || !message) {
      return res.status(400).json({
        message:
          "Missing required fields: complainerName, complaineeName, and message are all required.",
      });
    }

    const complaint = new Complaint({
      complainerName,
      complaineeName,
      message,
    });

    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating complaint." });
  }
};

// Get all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching complaints." });
  }
};

// Delete a single complaint by ID
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Complaint ID is required." });
    }

    const deleted = await Complaint.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.json({ message: "Complaint deleted successfully." });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res
      .status(500)
      .json({ message: "Internal server error while deleting complaint." });
  }
};

// Delete all complaints
export const deleteAllComplaints = async (req, res) => {
  try {
    const result = await Complaint.deleteMany({});
    res.json({
      message: `All complaints deleted successfully. Total deleted: ${result.deletedCount}`,
    });
  } catch (error) {
    console.error("Error deleting all complaints:", error);
    res
      .status(500)
      .json({
        message: "Internal server error while deleting all complaints.",
      });
  }
};

// Update only the status of a complaint by ID
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Complaint ID is required." });
    }

    if (!status) {
      return res.status(400).json({ message: "Status field is required." });
    }

    const validStatuses = ["pending", "in-progress", "resolved"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          message: `Invalid status value. Allowed values: ${validStatuses.join(
            ", "
          )}`,
        });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res
      .status(500)
      .json({
        message: "Internal server error while updating complaint status.",
      });
  }
};
