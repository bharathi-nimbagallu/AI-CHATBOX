
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSessionState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
