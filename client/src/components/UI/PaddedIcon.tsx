import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

interface IconProps {
  marginLeft?: string;
  icon: IconProp;
  functionToPerform?: () => void;
  color?: string;
  marginRight?: number;
}

const IconContainer = styled.div``;

export const PaddedIcon: React.FC<IconProps> = ({
  icon,
  marginLeft = ".4em",
  functionToPerform,
  color,
  marginRight
}) => {
  return (
    <IconContainer style={{ marginLeft: marginLeft, marginRight: marginRight }}>
      <FontAwesomeIcon
        icon={icon}
        size="1x"
        onClick={functionToPerform}
        color={color}
      />
    </IconContainer>
  );
};

/* &:hover {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: ${(props: iLabel) =>
      `"${props.label ? props.label.toUpperCase() : ""}"`};
    position: absolute;
    background-color: white;
    color: black;
    z-index: 3;
    width: 70px;
    font-size: 0.7em;
    right: -100%;
    bottom: -35px;
    padding: 5px 10px;
    border-radius: 30px;
    border: 3px solid lightgray;
    opacity: 0;
  } */
