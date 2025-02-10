import { FC, Dispatch, SetStateAction, useState } from 'react';
import { UseFormGetValues, Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import {
  Box,
  Step,
  Stepper,
  StepLabel,
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { DateTimePicker } from '@mui/x-date-pickers';
import AppointmentInterface, {
  FormProps,
} from '../../../../interfaces/appointmentData';
import axiosClient from '../../../../axiosClient/axiosClient';

const PatientAppointment: FC<{
  setDialogID: Dispatch<SetStateAction<string>>;
  doctor_id: string;
  patient_id: string | undefined;
}> = ({ setDialogID, doctor_id, patient_id }) => {
  const steps = [
    'Describe complaints',
    'Set time and date for appointment',
    'Confirm details of appointment',
  ];
  const {
    register,
    formState,
    handleSubmit,
    watch,
    control,
    getValues,
    reset,
  } = useForm<AppointmentInterface>({
    defaultValues: {
      doctor_id: doctor_id,
      patient_id: patient_id,
      complaints: '',
      additional_info: '',
      hypertension: false,
      diabetes: false,
      sickle_cell: false,
      asthma: false,
      PUD: false,
      SLE: false,
      allergies: false,
      allergies_info: '',
      epilepsy: false,
      others: '',
      appointment_time: moment().add(1, 'hour'),
    },
  });
  const { isValid, isDirty, isSubmitting } = formState;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleReset = () => {
    reset();
    setActiveStep(0);
  };
  const submitData = async (data: AppointmentInterface) => {
    const modified_data = {
      ...data,
      appointment_time: data.appointment_time?.toISOString(),
    };
    // TODO: handle successful appt
    try {
      const response = await axiosClient.post(
        '/api/v1/resources/appointments',
        modified_data
      );
      setDialogID('');
    } catch (e) {
      console.log(e);
    }
  };
  // const submitAppointment
  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mb: '50px' }}>
        <form onSubmit={handleSubmit(submitData)}>
          <Box
          // sx={{ border: '2px solid green' }}
          >
            {activeStep === 0 ? (
              <AppointmentPage1 register={register} />
            ) : activeStep === 1 ? (
              <AppointmentPage2
                register={register}
                watch={watch}
                control={control}
              />
            ) : activeStep === 2 ? (
              <AppointmentPage3 getValues={getValues} />
            ) : (
              <Typography sx={{justifySelf: 'center', my: '10px'}}>Submit or reset appointment details</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* This code does not follow the MUI documentation but works for some reason. The documented code keeps breaking my app. Leave as is. */}
            {activeStep === steps.length + 1 ? (
              <>
                <Button onClick={handleReset}>Reset</Button>
                <Button type='submit'>Submit</Button>
              </>
            ) : (
              <>
                <Box>
                  <Button disabled={activeStep === 0} onClick={handlePrev}>
                    Previous
                  </Button>
                  {activeStep === steps.length ? (
                    <Button onClick={handleReset}>Reset</Button>
                  ) : null}
                </Box>
                <Button
                  onClick={handleNext}
                  disabled={
                    activeStep >= steps.length &&
                    (!isValid || !isDirty || isSubmitting)
                  }
                >
                  {activeStep === steps.length ? 'Submit' : 'Next'}
                </Button>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PatientAppointment;

const AppointmentPage1 = ({ register }: FormProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        size='small'
        label='Complaints'
        variant='standard'
        required
        sx={{ fontSize: '20px' }}
        {...register('complaints')}
        placeholder={
          "Describe your complaints and how long you have been experiencing them.\nFor example:\n'My body has been hot for 2 days'."
        }
      />
      <TextField
        size='small'
        label='More information concerning symptoms'
        variant='standard'
        sx={{ fontSize: '20px' }}
        {...register('additional_info')}
        multiline
        placeholder={
          "Give additional information concerning your symptoms and any action or drugs that you have taken since the symptoms started.\nFor example:\n'The fever occurs from time to time and gets worse at night.\nSince my symptoms began, I have used Lonart and Paracetamol'"
        }
      />
    </Box>
  );
};
const AppointmentPage2 = ({ register, watch, control }: FormProps) => {
  const showAllergiesInfo = watch ? watch('allergies_info') : null;

  return (
    <Grid container columns={12}>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('sickle_cell')} />}
          label='Sickle Cell'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('hypertension')} />}
          label='Hypertension'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('diabetes')} />}
          label='Diabetes'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('asthma')} />}
          label='Asthma'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('PUD')} />}
          label='PUD'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('SLE')} />}
          label='SLE'
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Checkbox {...register('allergies')} />}
          label='Allergies'
        />
      </Grid>
      {showAllergiesInfo && (
        <Grid item xs={8}>
          <TextField
            size='small'
            label='More information about allergies'
            variant='standard'
            multiline
            {...register('allergies_info')}
          />
        </Grid>
      )}
      <Grid item xs={8} sx={{ mt: '10px  ' }}>
        <Controller
          control={control}
          name='appointment_time'
          rules={{ required: 'Date and time are required' }}
          render={({ field }) => (
            <DateTimePicker
              label='Date and time of the appointment in "Africa/Lagos" time'
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
const AppointmentPage3: FC<{
  getValues: UseFormGetValues<AppointmentInterface>;
}> = ({ getValues }) => {
  const data = getValues();
  const returnIcon = (value: boolean) => {
    if (value) {
      return <CheckIcon fontSize='small' />;
    }
    return <ClearIcon fontSize='small' />;
  };
  return (
    <>
      <Stack>
        <Box>
          <Typography component='h5' variant='h6' sx={{ mb: '10px' }}>
            Your appointment details:
          </Typography>
        </Box>
        <Grid
          container
          columns={12}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
          }}
        >
          <Grid item>
            <Typography>Complaints: {data.complaints}</Typography>
          </Grid>
          {data.additional_info && (
            <Grid item>
              <Typography>
                Additional Information: {data.additional_info}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Typography>
              Time of appointment:{' '}
              {data.appointment_time
                ? data.appointment_time.format('dddd, MMMM Do YYYY, h:mm a')
                : ''}
            </Typography>
          </Grid>
          <Grid container columns={12} sx={{ mt: '10px' }}>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Sickle Cell: {returnIcon(data.sickle_cell)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Hypertension: {returnIcon(data.hypertension)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Diabetes: {returnIcon(data.diabetes)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Asthma: {returnIcon(data.asthma)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Peptic Ulcer Disease: {returnIcon(data.PUD)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Lupus: {returnIcon(data.SLE)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Epilepsy: {returnIcon(data.epilepsy)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Allergies: {returnIcon(data.allergies)}
              </Typography>
            </Grid>
          </Grid>
          {data.allergies && (
            <Grid item>
              <Typography>Details about allergy:</Typography>
              <Typography>{data.allergies_info}</Typography>
            </Grid>
          )}
          {data.others && (
            <Grid item>
              <Typography>
                Other important medical information: {data.others}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Stack>
    </>
  );
};
// export const getAppointmentSteps = (step: number, {register, formState: {errors}, control, getValues}: StepContentProps<AppointmentInterface>) => {
//     switch (case) {
//         case 0:
//             return (Box)
//     }
// }
