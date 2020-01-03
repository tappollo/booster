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
  email: string;
  avatar: string;
}

// Private profile only you can see or update
export interface PrivateProfile {
  address: string;
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
