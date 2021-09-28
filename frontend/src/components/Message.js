import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const MessageMeta = styled.div`
  padding: 0px;
  font-size: 12px;
  background-color: #201d1c;
`;
const MessageContent = styled.p`
  line-height: 0px;
  padding: 0px;
  color: #201d1c;
`;
const Message = ({ time, content, user }) => {
  return (
    <MessageContainer>
      <MessageMeta>
        {user} at {time}
      </MessageMeta>
      <MessageContent>{content}</MessageContent>
    </MessageContainer>
  );
};

export default React.memo(Message);
