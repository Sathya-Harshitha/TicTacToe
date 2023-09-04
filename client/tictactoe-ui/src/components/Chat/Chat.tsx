import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Chat = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/test");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("New Message", lastMessage.data);
    }
  }, [lastMessage]);

  return (
    <div>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          sendMessage(message);
        }}
      >
        Send
      </button>
      <h1>{lastMessage?.data}</h1>
    </div>
  );
};

export default Chat;
