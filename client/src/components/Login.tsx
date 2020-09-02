import React, { useState, useContext } from "react";
import styled from "styled-components";
import { LoginContext } from "../contexts/login/Login";
import logo from "../images/logo.jpg";
import { login } from "../utils/dbFunctions";
import { Role } from "../models/AuthRole";

const RoundLogoContainer = styled.div`
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #03045e;

  img {
    width: 80px;
    height: 80px;
  }

  h3 {
    color: #caf0f8;
    font-family: sans-serif;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    min-width: 350px;
  }

  input {
    padding: 1em;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    background-color: #023e8a;
    padding: 1em;
    width: 100%;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }

  .error {
    color: #ff4646;
    padding: 1em;
  }
`;

export const Login: React.FC = () => {
  const { authenticate } = useContext(LoginContext);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const resetForm = () => {
    setInput("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const role: Role = await login(input);
    if (role === "unauthorised") {
      setError("WRONG PASSWORD");
    } else {
      authenticate(role);
    }
  };

  return (
    <StyledLogin>
      <RoundLogoContainer>
        <img src={logo} alt="EC Rep logo" />
      </RoundLogoContainer>
      <h3>ENTER PASSWORD TO ACCESS</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="password"
          name="password"
          onClick={resetForm}
          onChange={e => handleChange(e)}
          value={input}
          required
        />
        {error.length > 0 && <p className="error">{error}</p>}
        <button type="submit">LOG IN</button>
      </form>
    </StyledLogin>
  );
};

export default Login;
