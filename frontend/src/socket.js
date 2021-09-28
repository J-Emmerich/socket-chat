import React from "react";
import socketio from "socket.io-client";

export const SOCKET_URL = "http://localhost:3001"; // So to set them to rooms later
export const getSocket = (token, user) => {
  return socketio(SOCKET_URL, { query: { token, user: user.id } });
};
export const SocketContext = React.createContext();
