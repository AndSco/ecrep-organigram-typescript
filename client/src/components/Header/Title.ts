import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";
import { teamColors } from "../../constants/colors";

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    background-color: ${teamColors[3]};
    width: 40%;
    color: white;
    font-size: 2em;
  }

  h1 {
    color: #1573d8;
    width: 50%;
    background-color: white;
    font-family: "EC Square sans pro light";
    font-size: 3em;
  }

  h1,
  h2 {
    margin: 0;
    text-align: left;
    padding: 0.2em;
    padding-left: 2.5%;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    align-items: center;

    h1,
    h2 {
      font-size: 1.5em;
      padding: 0.5em 0.8em;
      text-align: center;
    }

    h1 {
      width: 80%;
      font-size: 1.7em;
    }

    h2 {
      width: 60%;
    }
  }
`;
