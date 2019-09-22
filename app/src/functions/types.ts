import { AppDate } from "./envTypes";

export interface UserInfo {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
}

export interface Conversation {
  _duplicateLookup: string;
  userIds: string[];
  userDetails: {
    [key: string]: UserInfo;
  };
  updatedAt: AppDate;
  latestMessage?: Message;
}

export interface Message {
  text: string;
  createdBy: string;
  createdAt?: AppDate;
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
