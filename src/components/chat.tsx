import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const Chat = () => {
    const { messages, sendMessage } = useSocket();
    const [message, setMessage] = useState("");

    return (
        <div>
            <h2>Chat</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={() => sendMessage(message)}>Send</button>
        </div>
    );
};


