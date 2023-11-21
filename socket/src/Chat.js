import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ userName, room, socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const send_message = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      //sending message to a socket server
      await socket.emit("send_message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    //getting the message from
    socket.on("recive_message", (data) => {
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList?.map((message, index) => (
            <div
              className="message"
              key={index}
              id={userName === message.author ? "other" : "you"}
            >
              <div>
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{message.time}</p>
                  <p id="author">{message.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyUp={(event) => {
            event.key === "Enter" && send_message();
          }}
        />
        <button onClick={send_message}>&#9658;</button>
      </div>
    </div>
  );
}
