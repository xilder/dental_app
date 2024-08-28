interface UserInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export default UserInterface;
