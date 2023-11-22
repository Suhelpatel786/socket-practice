import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ userName, room, socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [rightMessage, setRightMessage] = useState("");
  const [badWordsArray, setBadWordsArray] = useState([
    "fuck",
    "shit",
    "fucker",
    "bitch",
    "pigfucker",
    "ass",
    "damn",
    "jesus",
    "kike",
    "cocksucker",
    "nigra",
    "wanker",
    "bullshit",
    "asshole",
    "bloody",
    "cock",
    "dick",
    "fatherfucker",
    "goddamn",
  ]);

  const send_message = async () => {
    if (currentMessage !== "") {
      let updateMessage = currentMessage;
      const currentMessageArray = currentMessage.split(" ");

      for (let i = 0; i < badWordsArray.length; i++) {
        for (let j = 0; j < currentMessageArray.length; j++) {
          if (currentMessageArray[j] === badWordsArray[i]) {
            const firstCharacter = currentMessageArray[j].charAt(0);
            const sensoredChar = "*".repeat(currentMessageArray[j].length - 1);

            const censoredWord = firstCharacter + sensoredChar;

            //the updating current message change logic
            updateMessage = updateMessage.replace(
              currentMessageArray[j],
              censoredWord
            );
          }
        }
      }

      const messageData = {
        room: room,
        author: userName,
        message: updateMessage,
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
