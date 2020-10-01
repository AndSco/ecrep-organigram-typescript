import React, { createContext, useState, useReducer } from "react";
import {
  FormInputs,
  FormAction,
  InputName,
  emptyForm
} from "../../models/Form";
import { formReducer, Action } from "../../reducers/formReducer";
import { TeamMember } from "../../models/TeamMember";

interface iFormContext {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  inputValues: FormInputs;
  updateForm: (action: Action) => void;
  userToEdit?: TeamMember;
  loadUserToEdit: (user: TeamMember) => void;
  formAction: FormAction;
  resetForm: () => void;
}

const startingValue: iFormContext = {
  isVisible: false,
  show: () => {},
  hide: () => {},
  inputValues: emptyForm,
  updateForm: (actionType: Action) => {},
  userToEdit: undefined,
  loadUserToEdit: (user: TeamMember) => {},
  formAction: "ADD",
  resetForm: () => {}
};

export const FormContext = createContext(startingValue);

export const FormContextProvider: React.FC = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<FormAction>("ADD");
  const [userToEdit, setUserToEdit] = useState<TeamMember | undefined>(
    undefined
  );
  const [inputValues, dispatch] = useReducer(formReducer, emptyForm);

  const show = () => setIsVisible(true);
  const hide = () => {
    setIsVisible(false);
    if (userToEdit) {
      resetForm();
    }
  };
  const startEditing = () => {
    setFormAction("EDIT");
  };

  const uploadUserValues = (user: TeamMember) => {
    for (const [key, val] of Object.entries(user)) {
      dispatch({ type: key as InputName, payload: val });
    }
  };

  const loadUserToEdit = (user: TeamMember) => {
    setUserToEdit(user);
    uploadUserValues(user);
    startEditing();
  };

  const resetForm = () => {
    setUserToEdit(undefined);
    setFormAction("ADD");
    dispatch({ type: "resetForm" });
  };

  const valuesToPass: iFormContext = {
    isVisible,
    formAction,
    show,
    hide,
    inputValues,
    updateForm: dispatch,
    userToEdit,
    loadUserToEdit,
    resetForm
  };

  return (
    <FormContext.Provider value={{ ...valuesToPass }}>
      {children}
    </FormContext.Provider>
  );
};
