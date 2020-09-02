import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

export interface Props {
  isVisible: boolean;
}

export const FormContainer = styled.div`
  position: fixed;
  z-index: 5;
  width: 100vw;
  margin: 0 auto;
  background-color: #2e1f27;
  padding: 0 1em;
  color: white;
  top: 0;
  transition: right 0.4s ease;
  right: ${(props: Props) => (props.isVisible ? 0 : "-200%")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0;
    margin-bottom: 0.5em;
    padding: 0.3em;
    border-bottom: 3px solid #64c964;
  }

  button {
    opacity: 0.7;
  }

  button:hover {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    padding: 0;
    min-height: 100vh;
    overflow: scroll;

    select,
    input[type="file"] {
      width: 300px;
    }
  }
`;
