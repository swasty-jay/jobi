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
