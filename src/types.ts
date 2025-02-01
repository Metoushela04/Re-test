export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}