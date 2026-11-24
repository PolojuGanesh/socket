import { io } from "socket.io-client"; // it is important to import the io function from the socket.io-client library in order to establish a connection with the backend server. io is a function that creates a new socket connection to the server. It takes the server URL as an argument and returns a socket object that can be used to send and receive messages between the client and server. io is used to give individual clients their own unique socket connection to the server, allowing for real-time communication between the client and server. The io function is typically called once when the client first connects to the server, and the resulting socket object can be used throughout the application to send and receive messages. The io function is an essential part of building real-time web applications with Socket.IO.

export const socket = io.connect("http://localhost:3000/", {
  autoConnect: true,
}); // establish a connection with the backend server
