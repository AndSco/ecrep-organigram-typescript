"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    designation: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    officePhone: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    indexInTeam: {
        type: Number,
        required: true
    }
}, { timestamps: true });
exports.Employee = mongoose_1.model("Employee", employeeSchema);
