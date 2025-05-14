const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or restrict to your domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("vote", (data) => {
    io.emit(`vote_update_${data.battleId}`, data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
