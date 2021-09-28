import React, { useState } from "react";
import styled from "styled-components";
import { GoogleLogin } from 'react-google-login';
import { registerNewUser, loginNewUser, googleAccess } from "../services/auth";
import { GOOGLE_ID } from "../config";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-self: center;
  justify-content: center;
`;

const Form = styled.div`
  margin: 40px auto;
  font-family: "Segoe UI", sans-serif;
  padding: 25px 28px;
  background: #201d1c;
  border-radius: 4px;
  border: 1px solid #302d2d;
  display: flex;
  flex-flow: column wrap;
`;
const FormTitle = styled.p`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 400;
  color: #e7e7e7;
`;
const Label = styled.label`
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
  transition: all 0.2s ease;
`;
const BottomMessage = styled.p`
  color: #e7e7e7;
  text-align: center;
  > a {
    color: #e7e7e7;
  }
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

const ErrorMessage = styled.div`
  flex-grow: 0;
  text-align: center;
  color: white;
  font-size: 14px;
  padding: 5px;
  width: 90%;
`;
const InputBlock = styled.div`
  display: block;
  align-self: center;
  margin-bottom: 20px;
`;

const UserForm = ({ submitUser }) => {
  
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      const user = await loginNewUser(username, password);
      submitUser(user);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };
  const submitRegister = async (e, username, password) => {
    try {
      e.preventDefault();
      const user = await registerNewUser(username, password);
      submitUser(user);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const googleFailure = res =>{
    setErrorMessage(res.message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 6000);
  }
const googleSuccess = async (res)=>{
try{
 
const user = await googleAccess(res.tokenId)
submitUser(user);
} catch(err){
 
  setErrorMessage(err.message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 6000);
}
}

  return (
    <Container>
      <Form>
        <FormTitle>{isLoginForm ? "Login" : "Sign Up"}</FormTitle>
        <form>
          <InputBlock>
            <Label htmlFor="username"> Username: </Label>
            <Input
              placeholder="Your Username"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </InputBlock>
          <InputBlock>
            <Label htmlFor="password"> Password: </Label>
            <Input
              placeholder="Your password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputBlock>
        </form>
        <FormSubmit
          onClick={
            isLoginForm
              ? (e) => submitLogin(e, username, password)
              : (e) => submitRegister(e, username, password)
          }
        >
          Submit
        </FormSubmit>

        <BottomMessage>
          Want to&nbsp;
          <a href="#" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "Sign Up" : "Login"}
          </a>
          &nbsp;instead?
        </BottomMessage>
        <InputBlock>
          <BottomMessage>You can use Google too</BottomMessage>
        <GoogleLogin
    clientId={GOOGLE_ID}
    buttonText="Login with Google"
    onSuccess={googleSuccess}
    onFailure={googleFailure}
    cookiePolicy={'single_host_origin'}
  /> </InputBlock>
      </Form>
      {errorMessage ? (
        <ErrorMessage>
          <p>{errorMessage}</p>
        </ErrorMessage>
      ) : (
        <ErrorMessage>&nbsp;</ErrorMessage>
      )}
    </Container>
  );
};

export default UserForm;
