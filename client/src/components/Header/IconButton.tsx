import React from "react";
import styled from "styled-components";
import { PaddedIcon } from "../UI/PaddedIcon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { breakpoints } from "../../constants/breakpoints";

const Container = styled.button`
  padding: 5px 10px;
  border-radius: 30px;
  display: flex;
  background-color: white;
  border: 3px solid lightgray;
  color: grey;
  margin: 5px 0;
  cursor: pointer;
  opacity: 0.4;
  width: 130px;
  justify-content: center;
  text-align: center;

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    opacity: 1;
  }
`;

interface iIconButton {
  icon: IconProp;
  functionToPerform: () => void;
  label: string;
}

export const IconButton: React.FC<iIconButton> = ({
  icon,
  functionToPerform,
  label
}) => {
  return (
    <Container onClick={functionToPerform}>
      <span>{label}</span>
      <PaddedIcon
        icon={icon}
        marginLeft={".6em"}
        functionToPerform={functionToPerform}
      />
    </Container>
  );
};
