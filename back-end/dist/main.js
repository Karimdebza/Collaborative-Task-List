"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_route_1 = require("./Routes/users.route");
const task_route_1 = require("./Routes/task.route");
const task_list_route_1 = require("./Routes/task-list.route");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
dotenv_1.default.config();
const { API_PORT } = process.env;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app); // Créez un serveur HTTP à partir de l'application Express
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
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
        io.emit("receiveNotification", data); // Broadcast to all connected clients
    });
});
app.use("/user", users_route_1.userRouter);
app.use("/task", task_route_1.taskRouter);
app.use("/task-list", task_list_route_1.taskListRouter);
// Utilisez le serveur HTTP pour écouter les connexions
server.listen(API_PORT, () => {
    console.log("L'application tourne sur le port " + API_PORT);
});
