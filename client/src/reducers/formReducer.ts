import React from "react";
import { FormInputs, InputName, emptyForm } from "../models/Form";

export interface Action {
  type: InputName | "resetForm";
  payload?: string;
}

export const formReducer: React.Reducer<FormInputs, Action> = (
  state: FormInputs,
  action: Action
): FormInputs => {
  if (action.type === "resetForm") {
    return emptyForm;
  } else {
    return {
      ...state,
      [action.type]: action.payload
    };
  }
};
