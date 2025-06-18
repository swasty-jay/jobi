import { Timestamp } from "firebase/firestore";

export type JobType = "Remote" | "On-site" | "Hybrid";

export interface JobFormData {
  title: string;
  company: string;
  type: JobType;
  location: string;
  salary: string;
  applicationUrl: string;
  description: string;
  deadline: string;
}

// Define a type for Job
export interface Job {
  id: string;
  title?: string;
  description?: string;
  salary?: string | number;
  company?: string;
  location?: string;
  createdAt?: Timestamp;
  isApproved?: boolean;
  status?: string;
  [key: string]: unknown; // for any additional fields
}
