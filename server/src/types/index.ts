// filepath: /chatroom-socketio/chatroom-socketio/server/src/types/index.ts
export interface Message {
    id: string;
    userId: string;
    content: string;
    timestamp: Date;
}

export interface User {
    id: string;
    username: string;
}

export interface ChatRoom {
    id: string;
    name: string;
    users: User[];
    messages: Message[];
}