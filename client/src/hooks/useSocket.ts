import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string = 'http://localhost:3001') => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(serverUrl);

        return () => {
            socketRef.current?.disconnect();
        };
    }, [serverUrl]);

    return socketRef.current;
};