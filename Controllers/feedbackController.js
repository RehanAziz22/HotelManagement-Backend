const feedbackModel = require("../Models/FeedbackSchema");


const feedbackController = {

    getAllFeedbacks:async (req, res) => {
        try {
          const feedbacks = await feedbackModel.find();
          res.status(200).json({ feedbacks });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      },
      createFeedback :async (req, res) => {
        try {
          const { name, email,  message } = req.body;
      
          // Validate if all required fields are present
          if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields (name, email, message) are required" });
          }
      
          // Check if feedback with the same email already exists
          const existingFeedback = await feedbackModel.findOne({ email });
      
          if (existingFeedback) {
            // Update the existing feedback
            existingFeedback.name = name;
            existingFeedback.message = message;
      
            // Save the updated feedback
            await existingFeedback.save();
      
            return res.status(200).json({
              message: "Feedback updated successfully",
              feedback: existingFeedback,
              status: true
            });
          } else {
            // If no feedback exists, create a new one
            const feedback = new feedbackModel({ name, email, message });
      
            // Save new feedback to the database
            await feedback.save();
      
            return res.status(201).json({
              message: "Feedback created successfully",
              feedback,
              status: true
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      
}


module.exports = feedbackController