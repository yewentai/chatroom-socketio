export interface Message {
    _id?: string;
    username: string;
    content: string;
    timestamp: Date;
    room?: string;
}

export interface User {
    id: string;
    username: string;
}

export interface ChatRoom {
    id: string;
    name: string;
    messages: Message[];
    users: User[];
}