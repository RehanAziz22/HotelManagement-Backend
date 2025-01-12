const express = require("express");
const ConnectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to the database
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRouter = require("./Routes/userRoutes");
const roomRouter = require("./Routes/roomRoutes");
const taskRouter = require("./Routes/taskRoutes");
const invoiceRouter = require("./Routes/invoiceRoutes");
const feedbackRouter = require("./Routes/feedbackRoutes");
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/task", taskRouter);
app.use("/api/invoice", invoiceRouter);
app.use('/api/feedback',feedbackRouter)

// Testing endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// Server setup
const PORT = process.env.PORT || 8000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server:", error.message);
  process.exit(1); // Exit process on server start failure
}
