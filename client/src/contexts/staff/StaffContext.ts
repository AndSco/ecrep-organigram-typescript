import { createContext } from "react";
import { TeamMember } from "../../models/TeamMember";

export interface iStaffContext {
  staffMembers: TeamMember[];
  refreshStaffMembers: () => void;
}

const defaultsProps: iStaffContext = {
  staffMembers: [],
  refreshStaffMembers: () => {}
};

export const StaffContext = createContext(defaultsProps);
