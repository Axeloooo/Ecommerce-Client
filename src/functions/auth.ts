import { RegisteredUserInterface, LoggedUserType } from "../vite-env";

export async function logoutUser(): Promise<number> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/logout`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.status;
}

export async function registerUser(
  user: RegisteredUserInterface
): Promise<Response> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
      mode: "cors",
    }
  );
  return res;
}

export async function loginUser(user: LoggedUserType): Promise<Response> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sessions/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
      mode: "cors",
    }
  );
  return res;
}
