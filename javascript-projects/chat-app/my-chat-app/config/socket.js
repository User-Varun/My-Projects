const socketio = require("socket.io");

module.exports = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.on("joinRoom", ({ username, room }) => {
      socket.join(room);

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit("message", `${username} has joined the chat`);

      // Send users and room info
      io.to(room).emit("roomUsers", {
        room: room,
        users: getRoomUsers(room),
      });
    });

    socket.on("chatMessage", (msg) => {
      io.to(msg.room).emit("message", msg);
    });

    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
    });
  });

  return io;
};
