import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { TeamMember } from "../../models/TeamMember";

interface EmployeeCardProps {
  staffMember: TeamMember;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = props => {
  // const context = useContext(StaffContext);
  const { staffMember } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const removeModal = () => {
    setIsDeleting(false);
  };

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  return <Card staffMember={staffMember} />;
};

export default EmployeeCard;
