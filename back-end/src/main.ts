import  express,{ Request, Response,Application } from "express";
import dotenv from "dotenv"
import cors from "cors";
import  bodyParser  from "body-parser";
import pool from "./config/connexion-db";
import {userRouter} from "./Routes/users.route";
import {taskRouter} from "./Routes/task.route";
import {taskListRouter} from "./Routes/task-list.route";
import { Server } from "socket.io";
import { createServer } from "http";


dotenv.config();

const {API_PORT} = process.env;


const app : Application = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get('/', (req:Request, res:Response) :void => {
    res.json({
        message: "good path "
    })
})

io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  
    // Handle custom events for notifications
    socket.on("sendNotification", (data) => {
      io.emit("receiveNotification", data); // Broadcast to all connected clients
    });
  });
  

app.listen(API_PORT, (): void => {
    console.log("lapllication tourne sur le port "+ API_PORT)
    
})
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/task-list", taskListRouter);

