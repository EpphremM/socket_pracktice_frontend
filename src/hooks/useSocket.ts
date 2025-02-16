import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:3000";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {

        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
        });

        setSocket(socketInstance);


        socketInstance.on("sendMessage", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });


        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const sendMessage = (message: string) => {
        if (socket) socket.emit("sendMessage", message);
    };

    return { sendMessage, messages };
};
