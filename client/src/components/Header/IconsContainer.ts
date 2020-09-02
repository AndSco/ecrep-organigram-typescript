import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 3%;
  color: white;
  cursor: pointer;
  padding: 0.5em;

  svg {
    top: 1%;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    position: unset;
    flex-direction: row;
    width: 90%;
    align-self: center;
    margin-top: 1em;
  }
`;
