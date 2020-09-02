import React, { useContext } from "react";
import styled from "styled-components";
import { LoadingContext } from "../contexts/loading/LoadingContext";
import { Spinner } from "./UI/Spinner";
import { breakpoints } from "../constants/breakpoints";

export const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 4rem;
  padding-bottom: 0;

  @media (max-width: ${breakpoints.smallScreens}px) {
    padding: 0;
    padding-top: 3.5em;
  }
`;

export const Main: React.FC = ({ children }) => {
  const { isLoading } = useContext(LoadingContext);

  return <MainStyled>{isLoading ? <Spinner /> : children}</MainStyled>;
};
