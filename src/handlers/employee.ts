import { RequestHandler } from "express";
import { iEmployee, Employee } from "../dbModels/employee";
import { Team } from "../models/Team";

export const getEmployees: RequestHandler = async (req, res, next) => {
  try {
    const allEmployees = await Employee.find();
    const lastUpdatedEmployee = await Employee.findOne({}).sort({
      updatedAt: -1
    });
    if (lastUpdatedEmployee) {
      const lastUpdateDate = lastUpdatedEmployee.updatedAt;
      res
        .status(200)
        .json({ employees: allEmployees, lastUpdate: lastUpdateDate });
    } else {
      res.status(200).json({ employees: allEmployees });
    }
  } catch (err) {
    return next(err);
  }
};

export const createEmployee: RequestHandler = async (req, res, next) => {
  try {
    const { employeeData } = req.body as { employeeData: iEmployee };
    const newEmployee = await Employee.create(employeeData);
    res.status(200).json(newEmployee);
  } catch (err) {
    return next(err);
  }
};

export const editEmployee: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const editedEmployee = {
      designation: req.body.designation,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      officePhone: req.body.officePhone,
      mobile: req.body.mobile,
      email: req.body.email,
      team: req.body.team,
      imageUrl: req.body.imageUrl,
      indexInTeam: req.body.indexInTeam
    };
    await Employee.findByIdAndUpdate(req.params.id, editedEmployee, {
      new: true
    });
    return res.status(200).json(editedEmployee);
  } catch (err) {
    return next(err);
  }
};

export const deleteEmployee: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id: employeeId } = req.params;
    const employeeToRemove: iEmployee | null = await Employee.findById(
      employeeId
    );
    if (employeeToRemove) {
      employeeToRemove.remove();
      res
        .status(200)
        .json({ message: `Removed employee with id ${employeeId}` });
    }
  } catch (err) {
    return next(err);
  }
};

export const getTeamSize: RequestHandler<{ teamName: Team }> = async (
  req,
  res,
  next
) => {
  try {
    const { teamName } = req.params;
    console.log("TEAM", teamName);
    const team = await Employee.find({ team: teamName });
    res.status(200).json({ membersInTeam: team.length });
  } catch (err) {
    return next(err);
  }
};

export const adjustTeamIndexes: RequestHandler<{ teamName: Team }> = async (
  req,
  res,
  next
) => {
  try {
    const { teamName } = req.params;
    const { indexAffected } = req.body as { indexAffected: number };

    await Employee.updateMany(
      { team: teamName, indexInTeam: { $gt: indexAffected } },
      { $inc: { indexInTeam: -1 } }
    );
    return res.status(200).json({ message: "Indexes updated" });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

interface iSortedTeamMember {
  id: string;
  newIndex: number;
}

export const resortTeamMembers: RequestHandler = async (req, res, next) => {
  try {
    let sortedTeamMembers: iSortedTeamMember[];
    sortedTeamMembers = req.body.sortedTeamMembers;
    console.log("SORTING", sortedTeamMembers);
    for (const member of sortedTeamMembers) {
      await Employee.findByIdAndUpdate(member.id, {
        indexInTeam: member.newIndex
      });
    }
    res.status(200).json({ message: "All team indexes updated!" });
  } catch (err) {
    return next(err);
  }
};
