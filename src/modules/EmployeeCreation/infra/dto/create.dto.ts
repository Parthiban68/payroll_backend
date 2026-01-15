import { z } from "zod";

export const CreateEmployeeDtoSchema = z.object({
  emp_id: z.string().optional(),
  full_name: z.string().min(2).max(100),
  gender: z.enum(["Male", "Female", "Other"]),

  date_of_birth: z.string(),
  nationality: z.string(),

  contact_details: z.object({
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    alt_email: z.string().email().optional(),
  }),

  work_information: z.object({
    department: z.string(),
    designation: z.string(),
    work_mode: z.enum(["Onsite", "Remote", "Hybrid"]),
    date_joined: z.string(),
  }),

  bank_information: z.object({
    bank_name: z.string(),
    account_number: z.string().min(4),
    ifsc_code: z.string().length(11),
  }),

  present_address: z.object({
    street: z.string(),
    area: z.string(),
    city: z.string(),
    district: z.string(),
    state: z.string(),
    pincode: z.number().int(),
  }),

  permanent_address: z.object({
    street: z.string(),
    area: z.string(),
    city: z.string(),
    district: z.string(),
    state: z.string(),
    pincode: z.number().int(),
  }),

  health_information: z.object({
    blood_group: z.string(),
    medical_conditions: z.string().optional(),
    allergies: z.string().optional(),
  }),

  emergency_contact: z.object({
    name: z.string(),
    relation: z.string(),
    phone: z.string().min(10).max(15),
  }),
});

export type CreateEmployeeDto = z.infer<typeof CreateEmployeeDtoSchema>;
