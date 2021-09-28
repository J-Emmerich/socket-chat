import React, { useState, useContext, useCallback, useEffect } from "react";

import styled from "styled-components";
import { SocketContext } from "../socket";
import Message from "./Message";

const RoomStyled = styled.div`
  flex: 3;
  background-color: #201d1c;
  display: flex;
  flex-direction: column;
`;

const Messages = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
  flex: 1,
  overflowY: "scroll"
};

const Room = () => {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState([]);

  const [history, setHistory] = useState([]);

  const handleHistory = useCallback((serverHistory) => {
    setHistory(history.concat(serverHistory));
  }, []);

  useEffect(() => {
    socket.on("room_history", (serverHistory) => handleHistory(serverHistory));
    return socket.off("room_history", handleHistory);
  }, [socket]);

  //functional update
  const handleMessage = useCallback((message) => {
    setMessages((messages) => messages.concat(message));
  }, []);

  useEffect(() => {
    socket.on("message", (message) => handleMessage(message));
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const shouldRenderMessages = messages.length > 0 ? true : false;

  // Use callback and functional update because of performance issues
  const renderMessages = useCallback((message) => {
    return (
      <Message
        key={message.id}
        user={message.user}
        time={message.time}
        content={message.message}
      />
    );
  }, []);
  return (
    <RoomStyled>
      {shouldRenderMessages ? (
        <div style={Messages}>{messages.map(renderMessages)}</div>
      ) : null}
    </RoomStyled>
  );
};

export default Room;
