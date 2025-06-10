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
    messages: Message[];
    users: User[];
}