export default interface UserData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  serverMessage?: string;
  serverError?: boolean;
  loading?: boolean;
  confirmed?: boolean;
  authenticated?: boolean;
  name?: string;
  type?: string;
}

export interface AppointmentDoctorData {
  first_name: string;
  last_name: string;
  username: string;
  rank: string;
  email: string;
  id: string;
  about?: string;
}
