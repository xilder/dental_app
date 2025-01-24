import { Control, RegisterOptions, useForm, UseFormRegister } from 'react-hook-form';
import { Moment } from 'moment';

export default interface AppointmentInterface {
  doctor_id: string;
  patient_id: string;
  complaints: string;
  additional_info?: string;
  sickle_cell: boolean;
  hypertension: boolean;
  diabetes: boolean;
  asthma: boolean;
  PUD: boolean;
  SLE: boolean;
  epilepsy: boolean;
  allergies: boolean;
  allergies_info?: string;
  others?: string;
  appointment_time: Moment | null;
}

export interface AppointmentSummary {
  doctor_name: string;
  complaints: string;
  time: string;
}

export interface FormProps<
  T extends Record<string, any> = AppointmentInterface
> {
  register: UseFormRegister<AppointmentInterface>;
  control?: Control<T>;
  watch?: <K extends keyof T>(key: K) => T[K];
}

export interface ExtendedFormProps extends FormProps {
  dateTime: string | null;
  setDateTime: React.Dispatch<React.SetStateAction<string | null>>;
}
