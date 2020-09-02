"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resortTeamMembers = exports.adjustTeamIndexes = exports.getTeamSize = exports.deleteEmployee = exports.editEmployee = exports.createEmployee = exports.getEmployees = void 0;
const employee_1 = require("../dbModels/employee");
exports.getEmployees = async (req, res, next) => {
    try {
        const allEmployees = await employee_1.Employee.find();
        const lastUpdatedEmployee = await employee_1.Employee.findOne({}).sort({
            updatedAt: -1
        });
        if (lastUpdatedEmployee) {
            const lastUpdateDate = lastUpdatedEmployee.updatedAt;
            res
                .status(200)
                .json({ employees: allEmployees, lastUpdate: lastUpdateDate });
        }
        else {
            res.status(200).json({ employees: allEmployees });
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.createEmployee = async (req, res, next) => {
    try {
        const { employeeData } = req.body;
        const newEmployee = await employee_1.Employee.create(employeeData);
        res.status(200).json(newEmployee);
    }
    catch (err) {
        return next(err);
    }
};
exports.editEmployee = async (req, res, next) => {
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
        await employee_1.Employee.findByIdAndUpdate(req.params.id, editedEmployee, {
            new: true
        });
        return res.status(200).json(editedEmployee);
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteEmployee = async (req, res, next) => {
    try {
        const { id: employeeId } = req.params;
        const employeeToRemove = await employee_1.Employee.findById(employeeId);
        if (employeeToRemove) {
            employeeToRemove.remove();
            res
                .status(200)
                .json({ message: `Removed employee with id ${employeeId}` });
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getTeamSize = async (req, res, next) => {
    try {
        const { teamName } = req.params;
        console.log("TEAM", teamName);
        const team = await employee_1.Employee.find({ team: teamName });
        res.status(200).json({ membersInTeam: team.length });
    }
    catch (err) {
        return next(err);
    }
};
exports.adjustTeamIndexes = async (req, res, next) => {
    try {
        const { teamName } = req.params;
        const { indexAffected } = req.body;
        await employee_1.Employee.updateMany({ team: teamName, indexInTeam: { $gt: indexAffected } }, { $inc: { indexInTeam: -1 } });
        return res.status(200).json({ message: "Indexes updated" });
    }
    catch (err) {
        console.error(err);
        return next(err);
    }
};
exports.resortTeamMembers = async (req, res, next) => {
    try {
        let sortedTeamMembers;
        sortedTeamMembers = req.body.sortedTeamMembers;
        console.log("SORTING", sortedTeamMembers);
        for (const member of sortedTeamMembers) {
            await employee_1.Employee.findByIdAndUpdate(member.id, {
                indexInTeam: member.newIndex
            });
        }
        res.status(200).json({ message: "All team indexes updated!" });
    }
    catch (err) {
        return next(err);
    }
};
