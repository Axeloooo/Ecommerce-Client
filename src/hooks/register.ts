const API = "https://ecommerce-api-production-c90c.up.railway.app";

interface User {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}

export const registerUser = async (user: User) => {
  const res: Response = await fetch(`${API}/api/sessions/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log(res);
};
