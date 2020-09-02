import React, { useContext } from "react";
import styled from "styled-components";
import { FormAction } from "../../models/Form";
import { FormContext } from "../../contexts/form/FormContext";
import { StaffContext } from "../../contexts/staff/StaffContext";
import { TextInput } from "./TextInput";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { SubmitButton } from "./SubmitButton";
import { TeamSelect } from "./TeamSelect";
import { FileInput } from "./FileInput";
import {
  addStaffMember,
  editStaffMember,
  getTeamSize
} from "../../utils/dbFunctions";
import { TeamInterface } from "../../models/TeamInterface";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

interface FormProps {
  action: FormAction;
}

export const Form: React.FC<FormProps> = () => {
  const {
    inputValues,
    hide: closeForm,
    formAction,
    userToEdit,
    resetForm
  } = useContext(FormContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { refreshStaffMembers } = useContext(StaffContext);

  const closeOperation = () => {
    refreshStaffMembers();
    stopLoading();
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    startLoading();
    try {
      e.preventDefault();
      if (formAction === "EDIT") {
        const oldTeam = userToEdit!.team;
        const newTeam = inputValues.team;
        if (oldTeam !== newTeam) {
          // move at bottom if team changes!
          const newIndex = await getTeamSize(newTeam as TeamInterface);
          inputValues.indexInTeam = newIndex;
        }
        await editStaffMember(userToEdit!._id as string, inputValues);
      } else {
        await addStaffMember(inputValues);
      }
      closeOperation();
    } catch (err) {
      console.error(err);
      stopLoading();
    }
    closeForm();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextInput inputName="designation" />
      <TextInput inputName="firstName" />
      <TextInput inputName="lastName" />
      <TextInput inputName="officePhone" />
      <TextInput inputName="mobile" />
      <TextInput inputName="email" />
      <TeamSelect />
      <FileInput />

      <SubmitButton title={formAction === "ADD" ? "upload" : "edit"} />
    </StyledForm>
  );
};
