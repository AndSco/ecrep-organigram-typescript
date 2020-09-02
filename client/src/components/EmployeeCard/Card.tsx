import React, { useContext, useState } from "react";
import { TeamMember } from "../../models/TeamMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../../contexts/form/FormContext";
import { DeletingBox } from "../UI/DeletingBox";
import {
  Container,
  Details,
  LeftSide,
  ProfilePic,
  EditDeleteButtons
} from "./CardComponents";
import { resortTeamMembers } from "../../utils/dbFunctions";
import { filterByTeam } from "../../utils/functions";
import { StaffContext } from "../../contexts/staff/StaffContext";
import { LoginContext } from "../../contexts/login/Login";

export const Card: React.FC<{ staffMember: TeamMember }> = ({
  staffMember
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { loadUserToEdit, show: openForm } = useContext(FormContext);
  const { refreshStaffMembers, staffMembers } = useContext(StaffContext);
  const { authRole } = useContext(LoginContext);
  const [canDelete, setCanDelete] = useState(false);
  const closeDeletingBox = () => setCanDelete(false);

  const dragStartHandler = (e: React.DragEvent) => {
    console.log("dragging", staffMember.firstName);
    setIsDragging(true);
    e.dataTransfer!.setData("text/plain", JSON.stringify(staffMember)!);
    e.dataTransfer!.effectAllowed = "move";
  };

  const dragEndHandler = (e: React.DragEvent) => {
    setIsDragging(false);
  };

  const dragOverHandler = (e: React.DragEvent) => {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault(); // drop is only allowed if default is prevented. Default = not allowing dropping
    }
  };

  const dropHandler = async (e: React.DragEvent) => {
    const movingMember = JSON.parse(e.dataTransfer!.getData("text/plain"));
    if (movingMember.team === staffMember.team) {
      // if dropping on same member, do nothing
      if (movingMember._id === staffMember._id) {
        return;
      }
      const teamMembers = filterByTeam(staffMembers, movingMember.team);
      await resortTeamMembers(
        teamMembers,
        movingMember.indexInTeam,
        staffMember.indexInTeam!
      );
      refreshStaffMembers();
    }
  };

  return (
    <Container
      team={staffMember.team}
      className="employee"
      draggable={authRole === "admin"}
      canDrag={authRole === "admin"}
      onDragStart={e => dragStartHandler(e)}
      onDragEnd={e => dragEndHandler(e)}
      onDragOver={e => dragOverHandler(e)}
      onDrop={e => dropHandler(e)}
      isDragging={isDragging}
    >
      {canDelete && (
        <DeletingBox
          staffMemberToDelete={staffMember}
          closeDeletingBox={closeDeletingBox}
        />
      )}
      <LeftSide>
        <ProfilePic imageUrl={staffMember.imageUrl} />
        {authRole === "admin" && (
          <EditDeleteButtons>
            <FontAwesomeIcon
              icon="edit"
              onClick={() => {
                openForm();
                loadUserToEdit(staffMember);
              }}
            />
            <FontAwesomeIcon
              icon="trash-alt"
              onClick={() => {
                setCanDelete(true);
              }}
            />
          </EditDeleteButtons>
        )}
      </LeftSide>
      <Details staffMember={staffMember} />
    </Container>
  );
};
