import React, { useContext } from "react";
import styled from "styled-components";
import { IconsContainer } from "./IconsContainer";
import { Title } from "./Title";
import Flag from "../../images/flag.jpg";
import { FormContext } from "../../contexts/form/FormContext";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { PrintModeContext } from "../../contexts/printMode/PrintModeContext";
import { LoginContext } from "../../contexts/login/Login";
import { AddForm } from "../addForm/AddForm";
import { savePdf } from "../../utils/functions";
import { IconButton } from "./IconButton";
import { borderYellow } from "../../constants/colors";
import { useDeviceDetect } from "../../utils/useDeviceDetect";

const HeaderStyled = styled.header`
  width: 100%;
  background-image: url(${Flag});
  background-position: top;
  height: 32vh;
  min-height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 5px solid ${borderYellow};
`;

export const Header = () => {
  const { show: showForm, isVisible: isFormVisible } = useContext(FormContext);
  const { enterPrintMode, exitPrintMode, isInPrintMode } = useContext(
    PrintModeContext
  );
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { authRole, logout } = useContext(LoginContext);
  const { mobile } = useDeviceDetect();

  const hanldePdfDownload = async () => {
    try {
      startLoading();
      enterPrintMode();
      await savePdf();
      exitPrintMode();
      stopLoading();
    } catch (err) {
      console.error(err);
      stopLoading();
    }
  };

  return (
    <HeaderStyled>
      <Title>
        <h2>European Commission</h2>
        <h1>Representation in Malta</h1>
      </Title>

      <IconsContainer id="icons-container">
        {!mobile && (
          <IconButton
            icon="download"
            functionToPerform={hanldePdfDownload}
            label="Get PDF"
          />
        )}
        {authRole === "admin" && (
          <IconButton
            icon="user-plus"
            functionToPerform={showForm}
            label="Add staff"
          />
        )}
        <IconButton
          icon="sign-out-alt"
          functionToPerform={logout}
          label="Sign out"
        />
      </IconsContainer>

      <AddForm isVisible={isFormVisible} />
    </HeaderStyled>
  );
};

export default Header;
