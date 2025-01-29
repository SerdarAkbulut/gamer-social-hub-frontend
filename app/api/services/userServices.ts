import apiClient from "../client/apiClient";

interface User {
  userName: string;
  id: number;
}
export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};
export const registerUser = async () => {
  const response = await apiClient.post("/users/register");
  return response.data;
};
