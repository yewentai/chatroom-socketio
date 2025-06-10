import { Server } from "socket.io";
import { Message } from "../models/Message";

export const setupSocketHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
      
      // Notify others in the room
      socket.to(room).emit("userJoined", { 
        message: `A user joined the room`,
        room 
      });
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        console.log('Received message:', messageData);
        
        // Create message with or without room
        const message = new Message({
          username: messageData.username,
          content: messageData.content,
          timestamp: messageData.timestamp || new Date()
        });
        
        const savedMessage = await message.save();
        console.log('Message saved:', savedMessage);

        // Emit to the specific room if provided, otherwise to all
        if (messageData.room) {
          io.to(messageData.room).emit("message", savedMessage);
        } else {
          io.emit("message", savedMessage);
        }
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit("error", { message: "Failed to save message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};