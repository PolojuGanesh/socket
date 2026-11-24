import { socket } from "./socket";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room); // join the specified room
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room }); // send a message to the server
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message); // display the message received from the server
    });
  }, [socket]);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <input
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        type="text"
        placeholder="Type your room here"
        className="border"
        value={room}
      />
      <button className="border" onClick={joinRoom}>
        Join Room
      </button>
      <input
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        type="text"
        placeholder="Type your message here"
        className="border"
        value={message}
      />
      <button className="border" onClick={sendMessage}>
        Send message
      </button>
      <h3>Messages:</h3>
      <p>{receivedMessage}</p>
    </div>
  );
}

export default App;
