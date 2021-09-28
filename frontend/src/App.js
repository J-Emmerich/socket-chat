import { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Lobby from "./components/Lobby";
import UserForm from "./components/UserForm";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { SocketContext, getSocket } from "./socket";
import styled from "styled-components";
import history from "./history";
// background: #151414;#152028
const AppContainer = {
  display: "flex",
  backgroundColor: "#151414",
  flexFlow: "column wrap",
  minHeight: "100vh"
};
const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;
const A = styled.a`
  color: #e7e7e7;
`;
const Footer = {
  minHeight: "3vh",
  marginLeft: "auto"
};
const App = () => {
  const [isUsernameDefined, setIsUsernameDefined] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [socketContext, setSocketContext] = useState(""); // <-- Not tested

  useEffect(() => {
    let mounted = true; // <- to Prevent memory leak
    if (isUsernameDefined && mounted) {
      const socket = getSocket(token, user);

      setSocketContext(socket);
      history.push("/chat");
    }
    return () => (mounted = false); // <- to Prevent memory leak
  }, [isUsernameDefined]);

  const submitUser = (response) => {
    setUser(response.user);
    setToken(response.token);
    setIsUsernameDefined(!isUsernameDefined);
  };
  return (
    <SocketContext.Provider value={socketContext}>
      <div style={AppContainer}>
        <Header isDefined={isUsernameDefined} username={user.username} />

        <Content>
          <Router history={history}>
            <Switch>
              <PrivateRoute
                component={Lobby}
                path="/chat"
                user={user}
                token={token}
              />
              <Route path="/">
                <UserForm submitUser={submitUser} />
              </Route>
            </Switch>
          </Router>
        </Content>

        <footer style={Footer}>
          by <A href="https://github.com/j-emmerich">João Emmerich</A>
        </footer>
      </div>
    </SocketContext.Provider>
  );
};

export default App;
