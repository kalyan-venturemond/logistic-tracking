import { Driver } from './drivers';

export interface MessageContent {
  content: string;
  time: string;
}
export interface Message {
  id: number;
  title: string;
  date: string;
  drivers: Driver[];
  category: string;
  messages: MessageContent[];
}
