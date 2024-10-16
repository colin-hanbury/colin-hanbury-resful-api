const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./loadEnv");

const chatsController = require("./routes/chatsController");
const candidatesController = require("./routes/candidatesController");
const authController = require("./routes/authController");

const dbURL = process.env.ATLAS_URI || "";
const PORT = process.env.PORT || 5050;

mongoose.connect(dbURL).then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const app = express();

app.use(cors());
app.use(express.json());

// Load the /chat routes
app.use("/chats", chatsController);
// Load the /candidate routes
app.use("/candidates", candidatesController);
// Load the /auth routes
app.use("/auth", authController);


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});