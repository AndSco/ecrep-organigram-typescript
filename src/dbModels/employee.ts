import { Schema, Document, model } from "mongoose";
import { Team } from "../models/Team";

export interface iEmployee extends Document {
  designation: string;
  firstName: string;
  lastName: string;
  officePhone?: string;
  mobile?: string;
  email: string;
  team: Team;
  imageUrl: string;
  updatedAt?: string;
  indexInTeam: number;
}

const employeeSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const Employee = model<iEmployee>("Employee", employeeSchema);
