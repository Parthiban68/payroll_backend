import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    emp_id: { type: String, required: true, unique: true },

    full_name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    date_of_birth: { type: Date, required: true },
    nationality: { type: String, required: true },

    contact_details: {
      phone: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      alt_email: { type: String },
    },

    work_information: {
      department: { type: String, required: true },
      designation: { type: String, required: true },
      work_mode: {
        type: String,
        enum: ["Onsite", "Remote", "Hybrid"],
        required: true,
      },
      date_joined: { type: Date, required: true },
    },

    bank_information: {
      bank_name: { type: String, required: true },
      account_number: { type: String, required: true },
      ifsc_code: { type: String, required: true },
    },

    present_address: {
      street: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },

    permanent_address: {
      street: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },

    health_information: {
      blood_group: { type: String, required: true },
      medical_conditions: { type: String },
      allergies: { type: String },
    },

    emergency_contact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["Draft", "Active", "Inactive"],
      default: "Draft",
    },
  },
  { timestamps: true }
);


export const EmployeeModel = model("employeeRegister", employeeSchema);
