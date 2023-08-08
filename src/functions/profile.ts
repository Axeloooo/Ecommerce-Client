import { TicketInterface } from "../vite-env";

export async function getTicketsByEmail(
  uid: string
): Promise<TicketInterface[]> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/carts/profile/receipts?email=${uid}`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}
