import { UserData } from "./user";

export type commentResponse = {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: null | string;
  user: UserData;
};
