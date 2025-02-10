import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { ChatMessage } from '../../interfaces/message';
import { Socket } from 'socket.io-client';
import { AppointmentDoctorData } from '../../interfaces/userData';
import { AppointmentSummary } from '../../interfaces/appointmentData';

export const ClientContext = createContext({} as Socket);
export const MessagesContext = createContext<{
  messages: { [key: string]: ChatMessage[] };
  setMessages: Dispatch<SetStateAction<{ [key: string]: ChatMessage[] }>>;
}>({
  messages: {},
  setMessages: () => {},
});
export const DoctorsContext = createContext([] as AppointmentDoctorData[]);
export const AppointmentsContext = createContext([] as AppointmentSummary[]);
const PatientContextProvider = ({
  children,
  client,
  messages,
  setMessages,
  doctors,
  appointments,
}: {
  children: ReactNode;
  messages: {
    [key: string]: ChatMessage[];
  };
  setMessages: Dispatch<
    SetStateAction<{
      [key: string]: ChatMessage[];
    }>
  >;
  client: Socket;
  doctors: AppointmentDoctorData[];
  appointments: AppointmentSummary[];
}) => {
  return (
    <AppointmentsContext.Provider value={appointments}>
      <DoctorsContext.Provider value={doctors}>
        <ClientContext.Provider value={client}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
          </MessagesContext.Provider>
        </ClientContext.Provider>
      </DoctorsContext.Provider>
    </AppointmentsContext.Provider>
  );
};

export default PatientContextProvider;
