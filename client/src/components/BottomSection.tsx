import React, { useContext } from "react";
import styled from "styled-components";
import { Team } from "./Team/Team";
import { StaffContext } from "../contexts/staff/StaffContext";
import { filterByTeam } from "../utils/functions";
import { breakpoints } from "../constants/breakpoints";

const BottomSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2em;
  margin-bottom: 6em;

  @media (max-width: ${breakpoints.bigScreens}px) {
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    max-width: 400px;
  }
`;

export const BottomSection: React.FC = () => {
  const { staffMembers } = useContext(StaffContext);
  const communicationStaff = filterByTeam(staffMembers, "Communication");
  const administrationStaff = filterByTeam(staffMembers, "Administration");
  const ESOStaff = filterByTeam(staffMembers, "Economic - ESO");

  return (
    <BottomSectionStyled>
      <Team teamName="Communication" teamMembers={communicationStaff} />
      <Team teamName="Administration" teamMembers={administrationStaff} />
      <Team teamName="Economic - ESO" teamMembers={ESOStaff} />
    </BottomSectionStyled>
  );
};
