import React, { useState, useContext, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar";
import Room from "./Room";
import styled from "styled-components";
import { SocketContext } from "../socket";
import SendMessage from "./SendMessage";

const SendMessageContainer = styled.div`
  flex: 0;
  align-self: flex-end;
  width: 100%;
`;
const lobbyheight = {
  height: "87vh"
};
const LobbyStyled = styled.div`
  display: flex;
  width: 100%;
  background-color: #201d1c;
  align-items: stretch;
`;
const Modal = styled.div`
  display: flex;
  flex: 3;
  flex-flow: column wrap;
`;

const Container = styled.div`
  flex: 3;
  background-color: #201d1c;
`;

const Lobby = ({ user }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");

  const handleUsers = useCallback((serverUsers) => {
    setUsers(() => serverUsers);
  }, []);

  const handleRoom = useCallback((serverRoom) => {
    setRoomId(serverRoom);
  }, []);

  useEffect(() => {
    socket.on("users_in_room", (serverUsers) => handleUsers(serverUsers));
    return socket.off("users_in_room", handleUsers);
  }, [socket, handleUsers]);

  useEffect(() => {
    socket.on("current_room", (serverRoom) => handleRoom(serverRoom));
    return socket.off("current_room", handleRoom);
  });

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const enterRoom = () => {
    if (room !== "") {
      const userToSend = { username: user.username, id: user.id, room };
      setJoined(!joined);
      socket.emit("joinRoom", userToSend);
    }
  };

  const leaveRoom = () => {
    socket.emit("disconnect_user", { roomId, room, username: user.username });
    setRoom("");
    setUsers([]);
    setRoomId("");
    setJoined(!joined);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chatMessage", chatMessage);
    setChatMessage("");
  };
  const changeChat = (e) => {
    setChatMessage(e.target.value);
  };
  return (
    <LobbyStyled style={lobbyheight}>
      <Sidebar
        users={users}
        handleRoomChange={handleRoomChange}
        enterRoom={enterRoom}
        leaveRoom={leaveRoom}
        room={room}
        joined={joined}
      />
      {joined ? (
        <Modal>
          <Room />
          <SendMessageContainer>
            <SendMessage
              sendChat={sendChat}
              chatMessage={chatMessage}
              changeChat={changeChat}
            />
          </SendMessageContainer>
        </Modal>
      ) : (
        <Container />
      )}
    </LobbyStyled>
  );
};

export default Lobby;
