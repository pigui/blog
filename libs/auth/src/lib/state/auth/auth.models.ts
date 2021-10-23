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
