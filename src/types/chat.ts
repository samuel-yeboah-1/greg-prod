export type MessageType = "user" | "chatbot";

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export interface ChatMessage {
  text: string;
  files?: File[];
}

export interface BubbleProps {
  children: React.ReactNode | string;
  className?: string;
  type?: MessageType;
}

export interface ChatInputProps {
  onSendMessage: (message: ChatMessage) => void;
  isLoading?: boolean;
}
