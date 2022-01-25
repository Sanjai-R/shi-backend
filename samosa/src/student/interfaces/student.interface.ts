export interface IStudent {
  email: string;
  mobile_number: string;
  password: string;
  name: string;
  device_id: string;
  skills?: string[];
  college?: string;
  profiles?: [];
  passed_out_year?: number;
  projects?: string[];
  location?: string;
  education: string[];
  experience_level?: number;
}
export interface ISignup {
  email: string;
  mobile_number: string;
  password: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IParser {
  data_url: string;
  file_name: string;
}
