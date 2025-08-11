import api from "@/lib/axios";
import { Login, Register } from "@/validations/auth";

export const loginUser = async (credentials: Login) => {
  const { data } = await api.post("/api/users/login", credentials);
  return data.data.token;
};

export const signUpUser = async (credentials: Register) => {
  await api.post("/api/users/signup", credentials);
};

