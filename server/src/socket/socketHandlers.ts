import { Server } from "socket.io";
import { Message } from "../models/Message";

export const setupSocketHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("sendMessage", async (messageData) => {
      const message = new Message(messageData);
      await message.save();

      io.to(messageData.room).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};