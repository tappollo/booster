// This file is shared across client, server, website and scripts

// We are using AppDate as a why to customize date
// Since it's different type on client vs on server
import { AppDate } from "./envTypes";

// This would be the data type we return from firestore calls
export interface Doc<T> {
  id: string;
  doc: T;
}

// Public profile that's visible to everyone
export interface Profile {
  name: string;
  avatar: string;
  email?: string;
  onboardingCompleted?: number;
}

// Private profile only you can see or update
export interface PrivateProfile {
  address?: string;
  phone?: string;
  createdAt?: AppDate;
  deviceInfo: {
    [deviceId: string]: any;
  };
  pushTokens: {
    [deviceId: string]: string;
  };
}

// System record only you can see, but not mutate
export interface ReadonlyProfile {
  accountBalance: number;
  behaviorScore: number;
}

// Chat Related
export interface Conversation {
  createdBy: string;
  userIds: string[];
  users: { [key: string]: Profile };
  createdAt: AppDate;
  updatedAt: AppDate;
  lastMessage?: Message;
  available: boolean;
}

// Chat Message
export interface Message {
  type: "text" | "image" | "system";
  content: string;
  createdBy: string;
  user: Profile;
  createdAt: AppDate;
}

// User online status
export interface UserStatus {
  online?: boolean;
  disconnectedAt?: AppDate;
  conversationId?: string;
  isTyping?: boolean;
}
