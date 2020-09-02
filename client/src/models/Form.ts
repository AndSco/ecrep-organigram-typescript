import { TeamMember } from "../models/TeamMember";

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
  imageUrl:
    "https://res.cloudinary.com/dnvvg886r/image/upload/v1598536472/organigram/dummy-profile_ivzn1r.png"
};
