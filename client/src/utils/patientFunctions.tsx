import axiosClient from '../axiosClient/axiosClient';
import { ChatMessage } from '../interfaces/message';

export const getContacts = async (): Promise<string[]> => {
  const response = await axiosClient.get('/api/v1/resources/get_contacts');
  const { contacts } = await response.data;
  return contacts;
};

export const getContactMessage = async (id: string): Promise<ChatMessage[]> => {
  const response = await axiosClient.get(`/api/v1/resources/get_contact_messages/${id}`);
  const {messages} = await response.data
  return messages
};
