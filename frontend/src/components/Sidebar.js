import styled from "styled-components";

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #a4a4a4;
`;
const P = styled.p`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #a4a4a4;
`;
const Input = styled.input`
  padding: 10px 8px;
  font-size: 16px;
  background: #323131;
  border: none;
  color: #c7c7c7;
  border-radius: 4px;
  outline: none;
`;
const InputBlock = styled.div`
  display: block;
  margin-bottom: 20px;
`;
const FormSubmit = styled.button`
  padding: 10px 18px;
  font-size: 15px;
  background: #1a3969;
  width: 100%;
  border: none;
  border-radius: 4px;
  color: #f4f4f4;
  align-self: center;
  margin-top: 3px;
  cursor: pointer;
`;
const SidebarStyled = styled.div`
  flex: 1;
  background-color: #151414;
  padding: 15px;
  margin: 5px;
`;
const UserList = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 20px;
`;
const Sidebar = ({
  users,
  handleRoomChange,
  room,
  leaveRoom,
  enterRoom,
  joined
}) => {
  const renderChatUser = joined ? true : false;
  return (
    <SidebarStyled>
      {renderChatUser ? (
        <>
          <P>Room Name: {room}</P>

          <P>Users</P>
          <UserList id="users">
            {users.map((user) => {
              return <div key={user._id}>{user.username}</div>;
            })}
          </UserList>
          <FormSubmit onClick={leaveRoom}>Leave Room</FormSubmit>
        </>
      ) : (
        <div>
          <Label htmlFor="room">Choose your room: </Label>
          <InputBlock>
            <Input id="room" onChange={handleRoomChange} value={room} />
          </InputBlock>
          <FormSubmit onClick={enterRoom}>Enter room</FormSubmit>
        </div>
      )}
    </SidebarStyled>
  );
};

export default Sidebar;
