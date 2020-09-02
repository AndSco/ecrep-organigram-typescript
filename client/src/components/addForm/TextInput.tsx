import React, { useContext } from "react";
import styled from "styled-components";
import { FormContext } from "../../contexts/form/FormContext";
import { InputName } from "../../models/Form";
import { setFormLabel } from "../../utils/functions";
import { breakpoints } from "../../constants/breakpoints";

const StyledInput = styled.input`
  padding: 0.7em;
  margin: 0.5em 0;
  width: 100%;
  font-size: 1em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 40%;
  margin-bottom: 0.5em;
  margin-left: 40px;
  margin-right: 40px;

  input,
  select {
    border-radius: 30px;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    width: 280px;
  }
`;

export const Label = styled.label`
  font-size: 0.8em;
  padding-left: 10px;
`;

interface TextInputProps {
  inputName: InputName;
}

export const TextInput: React.FC<TextInputProps> = ({ inputName }) => {
  const { updateForm, inputValues } = useContext(FormContext);
  const updateInputHandler = (enteredValue: string, inputName: InputName) => {
    updateForm({ type: inputName, payload: enteredValue });
  };

  return (
    <Container>
      <Label htmlFor={inputName}>{setFormLabel(inputName)}</Label>
      <StyledInput
        id={inputName}
        type="text"
        name={inputName}
        value={inputValues[inputName]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateInputHandler(e.target.value, inputName)
        }
        required={inputName !== "mobile" && inputName !== "officePhone"}
      />
    </Container>
  );
};
