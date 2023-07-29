const API: string = "https://ecommerce-api-production-c90c.up.railway.app";
// const API: string = "http://localhost:8080";

interface registerUser {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}

type loginUser = Omit<registerUser, "firstName" | "lastName" | "age">;

export const registerUser = async (user: registerUser) => {
  const res: Response = await fetch(`${API}/api/sessions/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  return res.status;
};

export const loginUser = async (user: loginUser) => {
  const res: Response = await fetch(`${API}/api/sessions/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  return res.status;
};
