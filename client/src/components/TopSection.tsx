import React, { useContext } from "react";
import styled from "styled-components";
import { StaffContext } from "../contexts/staff/StaffContext";
import { Team } from "./Team/Team";
import { filterByTeam } from "../utils/functions";
import { breakpoints } from "../constants/breakpoints";

const TopSectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: flex-start;

  @media (max-width: ${breakpoints.bigScreens}px) {
    flex-direction: column;
    align-items: center;
    max-width: 400px;
  }
`;

export const TopSection: React.FC = () => {
  const { staffMembers } = useContext(StaffContext);
  const dgtStaff = filterByTeam(staffMembers, "DGT");
  const horStaff = filterByTeam(staffMembers, "Head of Representation Office");
  const mediaPoliticalStaff = filterByTeam(staffMembers, "Press & Political");

  return (
    <TopSectionContainer>
      <Team teamName="DGT" teamMembers={dgtStaff} />
      <Team
        teamName="Head of Representation Office"
        teamMembers={horStaff}
        isHorTeam={true}
      />
      <Team teamName="Press & Political" teamMembers={mediaPoliticalStaff} />
    </TopSectionContainer>
  );
};
