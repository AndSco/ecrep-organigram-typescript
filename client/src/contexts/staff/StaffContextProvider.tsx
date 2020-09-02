import React, { useState, useEffect, useContext } from "react";
import { StaffContext, iStaffContext } from "./StaffContext";
import { TeamMember } from "../../models/TeamMember";
import { FormContext } from "../form/FormContext";
import { LoadingContext } from "../loading/LoadingContext";
import axios from "axios";
import { ErrorContext } from "../error/error";
import { apiUrls } from "../../constants/apiUrls";

export const StaffContextProvider: React.FC = ({ children }) => {
  const [staffMembers, setStaffMembers] = useState<TeamMember[]>([]);
  const [refreshSwitch, setRefreshSwitch] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const { addError } = useContext(ErrorContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const refreshStaffMembers = () => setRefreshSwitch(prevState => !prevState);

  useEffect(() => {
    console.log("refreshSwitch", refreshSwitch);
  }, [refreshSwitch]);

  const uploadStaffMembers = () => {
    startLoading();
    axios
      .get(apiUrls.employees)
      .then(res => {
        setStaffMembers(res.data.employees);
        setLastUpdate(res.data.lastUpdate);
      })
      .then(stopLoading)
      .catch(err => {
        addError("Something is wrong with your connection. Try again later");
      });
  };

  useEffect(() => {
    console.log("STAFF MEMBERS", staffMembers);
  }, [staffMembers]);

  useEffect(() => {
    uploadStaffMembers();
  }, [refreshSwitch]);

  const valuesToPass: iStaffContext = {
    staffMembers,
    refreshStaffMembers
  };

  return (
    <StaffContext.Provider value={{ ...valuesToPass }}>
      {children}
    </StaffContext.Provider>
  );
};
