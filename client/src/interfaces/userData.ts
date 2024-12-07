export default interface UserData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  serverResponse?: {
    error?: boolean;
    message?: string
  }
  loading?: boolean;
  confirmed?: boolean,
  authenticated?: boolean,
}
