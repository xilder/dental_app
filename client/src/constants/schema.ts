import { z, ZodType } from 'zod';
import RegistrationSchema from '../interfaces/registrationData';
import LoginSchema from '../interfaces/loginData';

export const registerSchema: ZodType<RegistrationSchema> = z
  .object({
    first_name: z.string().min(3, 'Name must be more than 3 letters'),
    last_name: z.string().min(3, 'Name must be more than 3 letters'),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const loginSchema: ZodType<LoginSchema> = z.object({
  data: z.string().min(1, 'Please enter your email or username'),
  password: z.string().min(1, 'Please enter your password'),
});
