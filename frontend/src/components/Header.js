import React from "react";

const HeaderStyled = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "baseline",
  minHeight: "10vh",
  borderBottom: "1px solid #e7e7e7",
  color: "#e7e7e7"
};

const Header = ({ isDefined, username }) => {
  return (
    <div style={HeaderStyled}>
      <h1> Module 5 Chat</h1>
      <h3>{isDefined ? `Hello ${username}` : "Welcome Stranger"}</h3>
    </div>
  );
};

export default Header;
