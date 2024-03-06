import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Actions from "./utils/Actions.js";
const app = express();
const socketServer = http.createServer(app);
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const io = new Server(socketServer, {
  cors: {
    origin: "*",
  },
});

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId].username,
        avatar: userSocketMap[socketId].avatar,
      };
    }
  );
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on(Actions.JOIN, ({ roomId, username, avatar }) => {
    console.log("join room", roomId, username, avatar);
    userSocketMap[socket.id] = { username, avatar };
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log("clients", clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        socketId: socket.id,
        username,
        avatar,
        clients,
      });
    });
  });
  
  socket.on('disconnecting',()=>{
    const rooms = [...socket.rooms];
    rooms.forEach((roomId)=>{
      socket.in(roomId).emit(Actions.DISCONNECTED,{
        socketId:socket.id,
        username:userSocketMap[socket.id].username
      })
    })
    delete userSocketMap[socket.id];
    socket.leave();
    console.log(socket.id, "disconnected"); 
  })

  socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
      socket.to(roomId).emit(Actions.CODE_CHANGE, { code });
  });
});
// routes
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/users", userRoutes);

export { socketServer };
