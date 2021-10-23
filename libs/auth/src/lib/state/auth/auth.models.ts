/**
 * Interface for the 'Auth' data
 */
export interface UserEntity {
  id: string; // Primary ID
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
  user: UserEntity;
}
