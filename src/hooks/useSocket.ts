import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:3000";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // Initialize the socket connection only once
        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ['websocket'], // Ensure using WebSocket transport
        });

        setSocket(socketInstance);

        // Listen for 'sendMessage' event and update messages
        socketInstance.on("sendMessage", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []); // Empty dependency array to ensure this runs only once when component mounts

    const sendMessage = (message: string) => {
        if (socket) socket.emit("sendMessage", message);
    };

    return { sendMessage, messages };
};
