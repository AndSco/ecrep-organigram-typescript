import axios from "axios";
import { CreationRequest, FormInputs } from "../models/Form";
import { apiUrls } from "../constants/apiUrls";
import { TeamInterface } from "../models/TeamInterface";
import arrayMove from "array-move";
import { TeamMember } from "../models/TeamMember";

export const getTeamSize = async (teamName: TeamInterface): Promise<any> => {
  try {
    const { data } = await axios.get<{ membersInTeam: number }>(
      `${apiUrls.employees}/${teamName}`
    );
    return data.membersInTeam;
  } catch (err) {
    console.error(err);
  }
};

export const addStaffMember = async (employeeData: FormInputs) => {
  try {
    const indexToInsert = await getTeamSize(employeeData.team as TeamInterface);
    employeeData.indexInTeam = indexToInsert;
    console.log("INDEX TO INSERT", indexToInsert);
    const response = await axios.post<CreationRequest>(apiUrls.employees, {
      employeeData
    });
    console.log("RES", response.data);
  } catch (err) {
    console.error(err);
  }
};

export const editStaffMember = async (id: string, employeeData: FormInputs) => {
  try {
    const response = await axios.patch(
      `${apiUrls.employees}/${id}`,
      employeeData
    );
    console.log("RES", response);
  } catch (err) {
    console.error(err);
  }
};

export const updateTeamIndexes = async (
  teamName: TeamInterface,
  indexAffected: number
) => {
  try {
    const response = await axios.post(`${apiUrls.employees}/${teamName}`, {
      indexAffected
    });
    console.log("EDITED TEAM INDEXES", response.data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteStaffMember = async (staffMemberId: string) => {
  try {
    const { data } = await axios.delete(
      `${apiUrls.employees}/${staffMemberId}`
    );
    console.log("DELETED", data);
  } catch (err) {
    console.error(err);
  }
};

interface iSortedTeamMember {
  id: string;
  newIndex: number;
}

export const resortTeamMembers = async (
  teamMembers: TeamMember[],
  originIndex: number,
  targetIndex: number
) => {
  try {
    const rearrangedArr = arrayMove(teamMembers, originIndex, targetIndex);
    const sortedTeamMembers: iSortedTeamMember[] = rearrangedArr.map(
      (item, index) => ({
        id: item._id!,
        newIndex: index!
      })
    );
    const response = await axios.post(`${apiUrls.employees}/resort`, {
      sortedTeamMembers: sortedTeamMembers
    });
    if (response.data) {
      console.log("RESPONSE: ", response.data);
    }
  } catch (err) {
    console.error(err);
  }
};

export const login = async (input: string) => {
  try {
    const response = await axios.post("/api", { password: input });
    const { role } = response.data;
    localStorage.setItem(role, "true");
    return role;
  } catch (err) {
    console.error("WRONG PASSWORD", err);
  }

  // .then(res => {
  //   console.log(res);
  //   if (res.data === "isAdmin") {
  //     props.handleLogin();
  //     props.authoriseAdmin();
  //     localStorage.setItem("isAdmin", "true");
  //   } else if (res.data === "isReader") {
  //     props.handleLogin();
  //     localStorage.setItem("isReader", "true");
  //   } else {
  //     setError(true);
  //     setInput("");
  //   }
  // });
};
