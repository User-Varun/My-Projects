document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const room = location.pathname.split("/").pop();
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatDiv = document.getElementById("chat");

  socket.emit("joinRoom", { username: "currentUserName", room });

  socket.on("message", (message) => {
    chatDiv.innerHTML += `<div><strong>${message.sender.username}:</strong> ${message.content}</div>`;
  });

  sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    socket.emit("chatMessage", { content: message, room });
    messageInput.value = "";
  });

  socket.on("message", (message) => {
    chatDiv.innerHTML += `<div><strong>${message.sender.username}:</strong> ${message.content}</div>`;
  });
});
