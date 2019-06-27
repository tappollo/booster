import { UserInfo } from "./auth";

export interface Match {
  userIds: string[];
  userDetails: {
    [key: string]: {
      name: string;
      avatar: string;
    };
  };
  updatedAt: Date;
  latestMessage?: Message;
  blocked?: boolean;
  blockedBy?: string;
}

export interface Message {
  text: string;
  createdBy: string;
  createdAt: Date;
  image?: string;
  system?: boolean;
}

export interface UserStatus {
  online?: boolean;
  disconnectedAt?: Date;
  conversationId?: string;
  isTyping?: boolean;
}

export interface Doc<T> {
  id: string;
  doc: T;
}

export const useNewContacts = () => {
  return {
    loading: true,
    items: [] as Array<Doc<UserInfo> & { conversationId?: string }>
  };
};
