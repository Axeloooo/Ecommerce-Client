import { registeredUser, loggedUser } from "../vite-env.d";

const API: string = "https://ecommerce-api-production-c90c.up.railway.app";
// const API: string = "http://localhost:8080";

export const registerUser = async (user: registeredUser): Promise<number> => {
  const res: Response = await fetch(`${API}/api/sessions/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
    mode: "cors",
  });
  return res.status;
};

export const loginUser = async (user: loggedUser): Promise<number> => {
  const res: Response = await fetch(`${API}/api/sessions/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
    mode: "cors",
  });
  return res.status;
};
