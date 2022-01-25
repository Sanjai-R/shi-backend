export interface JobInterface {
  title: string;
  description: string;
  salary: string;
  required_skills?: string[];
  experience_level: string;
  job_type: string;
  date_posted?: Date;
  is_closed?: boolean;
  company_name: string;
  company_website: string;
  contact_number: string;
  location: string;
}
