const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data); // join the specified room
  });

  socket.on("send_message", (data) => {
    // console.log(data); // log the message received from the client
    // socket.broadcast.emit("receive_message", data); // broadcast the message to all other connected clients
    socket.broadcast.emit("receive_message", data); // broadcast the message to all other connected clients
    socket.to(data.room).emit("receive_message", data); // send the message to all clients in the specified room except the senderaw
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//   },
// });

// // set up a connection event listener and run every time a new client connects to the server
// io.on("connection", (socket) => {
//   console.log(socket.id); // log the socket id of the connected client
// });
