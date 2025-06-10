import { Server } from "socket.io";

const chatHandler = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on("chatMessage", (msg) => {
            io.to(msg.room).emit("message", {
                user: msg.user,
                text: msg.text,
            });
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};

export default chatHandler;