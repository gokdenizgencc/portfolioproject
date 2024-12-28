export interface User {
    userId: number;
    fullName: string;
    email: string;
    passwordSalt: Uint8Array;
    passwordHash: Uint8Array;
    profilePhoto: string;
    bio: string;
    createdAt: Date;
    status: boolean;
  }