/// <reference types="vite/client" />

export interface registeredUser {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}

export type loggedUser = Omit<registerUser, "firstName" | "lastName" | "age">;
