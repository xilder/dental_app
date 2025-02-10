// import moment from 'moment';

export interface Message {
  sender: string;
  message: string;
}

export interface ChatMessage {
  id?: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
}

export default interface ChatMessageArray {
  [key: string]: ChatMessage[];
}
export const chatFormat = {
  'me': [{ sender_id: 'me', receiver_id: 'me', text: 'me', created_at: 'me' }],
};

export const chatFormat2: ChatMessage[] = [
  {
    sender_id: 'me', receiver_id: 'me', text: 'me', created_at: 'id',
    id: ''
  },
];
