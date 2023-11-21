import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import "./index.css";

const socket = io("http://localhost:3001"); //according to the new syntax

export default function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const join_room = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room); // sending a request to join a room
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            placeholder="Type your name.."
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            placeholder="Enter your room name"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={join_room}>Join A Room</button>
        </div>
      ) : (
        <Chat userName={userName} room={room} socket={socket} />
      )}
    </div>
  );
}
