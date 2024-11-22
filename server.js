import express from  'express';
import cors from "cors";
import http from 'http';
import { WebSocketServer } from 'ws';
import mongoose from "mongoose";
import "./loadEnv.js";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import WebSocketController from "./controllers/WebSocketController.js";


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

app.use("/chat", chatRoutes);
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);



// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});

const server = http.createServer(app);
global.webSocketServer = new WebSocketServer({ server });
global.webSocketServer.on('connection', () => WebSocketController.connection);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});