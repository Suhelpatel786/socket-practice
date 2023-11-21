import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); //according to the new syntax

export default function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const join_room = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room); // sending a request to join a room
    }
  };
  return (
    <div>
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
  );
}
