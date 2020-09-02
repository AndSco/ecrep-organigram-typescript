import React, { useContext } from "react";
import styled from "styled-components";
import { FormContext } from "../../contexts/form/FormContext";
import { TeamInterface } from "../../models/TeamInterface";
import { Label, Container } from "./TextInput";
import { breakpoints } from "../../constants/breakpoints";

const Select = styled.select`
  margin-left: 1em;
  font-size: 1em;
  color: black;
  background-color: white;
  flex: 1;
  padding: 10px;
  margin: 0.5em 0;

  @media (max-width: ${breakpoints.smallScreens}px) {
    margin: 0;
    width: 280px;
  }
`;
interface iOptionsAvailable {
  DGT: TeamInterface;
  HOR: TeamInterface;
  PRESS: TeamInterface;
  ADMIN: TeamInterface;
  COMM: TeamInterface;
  ESO: TeamInterface;
}

const optionsAvailable: iOptionsAvailable = {
  DGT: "DGT",
  HOR: "Head of Representation Office",
  PRESS: "Press & Political",
  ADMIN: "Administration",
  COMM: "Communication",
  ESO: "Economic - ESO"
};

export const TeamSelect: React.FC = () => {
  const { updateForm, inputValues } = useContext(FormContext);
  const updateSelectHandler = (enteredValue: TeamInterface) => {
    updateForm({ type: "team", payload: enteredValue });
  };

  return (
    <Container>
      <Label htmlFor="team">TEAM:</Label>
      <Select
        id="team"
        name="team"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          console.log("test");
          updateSelectHandler(e.target.value as TeamInterface);
        }}
        required
        value={inputValues.team}
      >
        <option value="">Please select a team</option>
        <option value={optionsAvailable.DGT}>DGT</option>
        <option value={optionsAvailable.HOR}>
          Head of Representation Office
        </option>
        <option value={optionsAvailable.PRESS}>Media & Political Team</option>
        <option value={optionsAvailable.COMM}>Communications Team</option>
        <option value={optionsAvailable.ADMIN}>Administration Team</option>
        <option value={optionsAvailable.ESO}>Economic Team</option>
      </Select>
    </Container>
  );
};
