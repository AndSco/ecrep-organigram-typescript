import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "./Modal";
import { TeamMember } from "../../models/TeamMember";
import { StaffContext } from "../../contexts/staff/StaffContext";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { updateTeamIndexes, deleteStaffMember } from "../../utils/dbFunctions";

interface iProps {
  action: "confirm" | "abort";
}

const DeletingBoxContainer = styled.div`
  width: 30%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  min-width: 400px;
  color: #504d4d;
  padding: 1em 3em;
`;

const Button = styled.button`
  font-size: 1em;
  padding: 0.5em;
  margin: 0.3em;
  color: white;
  border: 0;
  cursor: pointer;
  background-color: ${(props: iProps) =>
    props.action === "confirm" ? "#4f36de" : "#afafaf"};
`;

interface iDeletingBoxProps {
  staffMemberToDelete: TeamMember;
  closeDeletingBox: () => void;
}

export const DeletingBox: React.FC<iDeletingBoxProps> = ({
  staffMemberToDelete,
  closeDeletingBox
}) => {
  const { refreshStaffMembers } = useContext(StaffContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  return (
    <Modal>
      <DeletingBoxContainer>
        <h3>
          Are you sure you want to delete{" "}
          {staffMemberToDelete.firstName.toUpperCase()}{" "}
          {staffMemberToDelete.lastName.toUpperCase()}?
        </h3>
        <Button
          action="confirm"
          onClick={async () => {
            try {
              startLoading();
              await updateTeamIndexes(
                staffMemberToDelete.team,
                staffMemberToDelete.indexInTeam!
              );
              await deleteStaffMember(staffMemberToDelete._id!);
              refreshStaffMembers();
            } catch (err) {
              console.error(err);
              stopLoading();
            }
          }}
        >
          CONFIRM
        </Button>
        <Button action="abort" onClick={closeDeletingBox}>
          CANCEL
        </Button>
      </DeletingBoxContainer>
    </Modal>
  );
};
