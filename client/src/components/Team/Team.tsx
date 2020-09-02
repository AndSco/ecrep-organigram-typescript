import React from "react";
import { TeamMember } from "../../models/TeamMember";
import { TeamInterface } from "../../models/TeamInterface";
import { TeamContainer, MembersContainer } from "./TeamContainer";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { setTeamName } from "../../utils/functions";

interface TeamProps {
  teamName: TeamInterface;
  teamMembers: TeamMember[];
  isHorTeam?: boolean;
}

export const Team: React.FC<TeamProps> = ({
  teamName,
  teamMembers,
  isHorTeam
}) => {
  return (
    <TeamContainer teamName={teamName} isHorTeam={isHorTeam} className="team">
      <h2>{setTeamName(teamName).toUpperCase()}</h2>
      <MembersContainer id="members-container">
        {teamMembers &&
          teamMembers.map((member, index) => (
            <EmployeeCard staffMember={member} key={index} />
          ))}
      </MembersContainer>
    </TeamContainer>
  );
};
