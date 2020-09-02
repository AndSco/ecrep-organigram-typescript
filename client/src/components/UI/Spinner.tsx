import React from "react";
import styled, { keyframes } from "styled-components";
import { Modal } from "./Modal";

const spin = keyframes`
  to {
        transform: rotate(360deg);
      }
`;

const StyledSpinner = styled.div`
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #000;
    animation: ${spin} 0.6s linear infinite;
  }
`;

export const Spinner: React.FC = () => {
  return (
    <Modal>
      <StyledSpinner />
    </Modal>
  );
};
