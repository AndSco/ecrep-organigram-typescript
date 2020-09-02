import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #64c964;
  color: white;
  font-size: 1em;
  width: 300px;
  padding: 1em 0.5em;
  border: 3px solid white;
  border-radius: 40px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 0.7em;
  cursor: pointer;
`;

type ButtonName = "upload" | "edit";

interface SubmitButtonProps {
  title: ButtonName;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return <StyledButton type="submit">{title.toUpperCase()}</StyledButton>;
};
