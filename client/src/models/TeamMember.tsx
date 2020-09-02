import { TeamInterface } from "./TeamInterface";

export interface TeamMember {
  _id?: string;
  isUnitHead?: boolean;
  designation: string;
  firstName: string;
  lastName: string;
  officePhone?: string;
  mobile?: string;
  email: string;
  team: TeamInterface;
  imageUrl: string;
  indexInTeam?: number;
}
