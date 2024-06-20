import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./Routes/users.route";
import { taskRouter } from "./Routes/task.route";
import { commentRouter } from './Routes/comment.route';
import { taskListRouter } from "./Routes/task-list.route";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const { API_PORT } = process.env;

const app: Application = express();
const server = createServer(app); // Créez un serveur HTTP à partir de l'application Express

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "good path "
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle custom events for notifications
  socket.on("sendNotification", (data) => {
    console.log("Notification received on server:", data);
    io.emit("receivedNotification", data); // Corrected event name
  });
});

app.set('io', io); // Attach io instance to the app for later use in controllers

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/task-list", taskListRouter);
app.use('/comments', commentRouter);
// Utilisez le serveur HTTP pour écouter les connexions
server.listen(API_PORT, (): void => {
  console.log("L'application tourne sur le port " + API_PORT);
});
