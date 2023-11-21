import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

//creating server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//checking how many are connected to the server
io.on("connection", (socket) => {
  console.log(`socket ${socket.id}`);

  //when users try to disconnect
  socket.on("disconnect", () => {
    console.log("User Dosconneted", socket.id);
  });
});

//middle ware
app.use(cors);

//listining server
server.listen(3001, () => {
  console.log("server is running on the port 3001");
});
