import React from "react";
import { Card } from "./Card";
import { TeamMember } from "../../models/TeamMember";

interface EmployeeCardProps {
  staffMember: TeamMember;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = props => {
  const { staffMember } = props;

  return <Card staffMember={staffMember} />;
};

export default EmployeeCard;
