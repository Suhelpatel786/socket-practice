import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); //according to the new syntax

export default function App() {
  const sendMessage = () => {};
  return (
    <div>
      <input placeholder="message" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
