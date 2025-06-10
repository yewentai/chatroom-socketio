import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string = 'http://localhost:5001') => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(serverUrl, {
            transports: ['websocket', 'polling']
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [serverUrl]);

    return socketRef.current;
};