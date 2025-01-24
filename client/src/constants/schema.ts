import { z, ZodType } from 'zod';
import moment, {Moment} from 'moment'
import RegistrationSchema from '../interfaces/registrationData';
import LoginSchema from '../interfaces/loginData';
import AppointmentData from '../interfaces/appointmentData';

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

// export const appointmentSchema: ZodType<AppointmentData> = z.object({
//   complaints: z.string(),
//   addInfo: z.string().optional(),
  // hypertension: z.boolean(),
  // diabetes: z.boolean(),
  // sickleCell: z.boolean(),
  // asthma: z.boolean(),
  // PUD: z.boolean(),
  // SLE: z.boolean(),
  // allergies: z.boolean(),
  // allergiesInfo: z.string().optional(),
  // epilepsy: z.boolean(),
  // others: z.string().optional(),
  // dateTime: z.instanceof(Moment)
// });
