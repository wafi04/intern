import { API_RESPONSE } from "./types.utils";

export type UserData = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type UserResponse = API_RESPONSE<UserData>;
