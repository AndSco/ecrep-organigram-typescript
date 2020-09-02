import React from "react";
import "./App.css";
import { LoadingContextProvider } from "./contexts/loading/LoadingContext";
import { ErrorContextProvider } from "./contexts/error/error";
import { StaffContextProvider } from "./contexts/staff/StaffContextProvider";
import { FormContextProvider } from "./contexts/form/FormContext";
import { PrintModeContextProvider } from "./contexts/printMode/PrintModeContext";
import { LoginContextProvider } from "./contexts/login/Login";
import { ContactsBox } from "./components/ContactsBox";
import { TopSection } from "./components/TopSection";
import { BottomSection } from "./components/BottomSection";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faChevronCircleRight,
  faSignOutAlt,
  faHome,
  faDesktop,
  faTrashAlt,
  faEdit,
  faMobileAlt,
  faPhoneSquareAlt,
  faEnvelope,
  faUserPlus,
  faWindowClose,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import { Page } from "./components/Page";

library.add(
  fab,
  faChevronCircleRight,
  faSignOutAlt,
  faDownload,
  faHome,
  faDesktop,
  faTrashAlt,
  faEdit,
  faMobileAlt,
  faPhoneSquareAlt,
  faEnvelope,
  faUserPlus,
  faWindowClose,
  faImage
);

const App: React.FC = () => {
  return (
    <LoadingContextProvider>
      <ErrorContextProvider>
        <StaffContextProvider>
          <LoginContextProvider>
            <div className="App">
              <FormContextProvider>
                <PrintModeContextProvider>
                  <Page>
                    <Header />
                    <Main>
                      <TopSection />
                      <BottomSection />
                      <ContactsBox />
                    </Main>
                  </Page>
                </PrintModeContextProvider>
              </FormContextProvider>
            </div>
          </LoginContextProvider>
        </StaffContextProvider>
      </ErrorContextProvider>
    </LoadingContextProvider>
  );
};

export default App;
