import styled from "styled-components";

const SendMessageStyled = styled.div`
  align-self: stretch;
  flex: 1;
  background-color: white;
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  background: #1a3969;
  width: 100%;
`;

const FormStyled = styled.form`
  display: flex;
  flex: 1;
`;
const P = styled.p`
  margin: 10px 5px 10px 5px;
`;

const InputStyled = styled.input`
  align-items: center;
  width: 100%;
  padding: 10px 8px;
  font-size: 16px;
  background: #323131;
  border: none;
  color: #c7c7c7;
  outline: none;
  transition: all 0.2s ease;
`;
const SendMessage = ({ sendChat, chatMessage, changeChat }) => {
  return (
    <SendMessageStyled>
      <FormContainer>
        <P>Chat: </P>
        <FormStyled onSubmit={sendChat}>
          <InputStyled value={chatMessage} onChange={changeChat} />
        </FormStyled>
      </FormContainer>
    </SendMessageStyled>
  );
};

export default SendMessage;
