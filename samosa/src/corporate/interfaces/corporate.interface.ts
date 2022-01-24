export interface ICorporate {
  email: string;
  mobile_number: string;
  company_website?: string;
  company_logo?: string;
  company_address?: string;
}

export interface ISignup {
  email: string;
  company_name: string;
  password: string;
  company_website?: string;
  company_logo: string;
  company_address: string;
}
