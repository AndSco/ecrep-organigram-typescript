import { TeamMember } from "../models/TeamMember";
import { defaultProfilePicPath } from "../constants/apiUrls";

export type FormAction = "ADD" | "EDIT";

export interface FormInputs {
  designation: string;
  firstName: string;
  lastName: string;
  officePhone?: string;
  mobile?: string;
  email: string;
  team: string;
  imageUrl: string;
  indexInTeam?: number;
}

export type InputName =
  | "designation"
  | "firstName"
  | "lastName"
  | "officePhone"
  | "mobile"
  | "email"
  | "team"
  | "imageUrl";

export interface CreationRequest {
  employeeData: TeamMember;
}

export const emptyForm = {
  designation: "",
  firstName: "",
  lastName: "",
  officePhone: "",
  mobile: "",
  email: "",
  team: "",
  imageUrl: defaultProfilePicPath
};
