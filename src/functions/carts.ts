import { CartInterface, TicketInterface } from "../vite-env";

export async function deleteProductFromCart(cid: string, pid: string) {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/carts/${cid}/product/${pid}`,
    {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}

export async function getCartById(cid: string): Promise<CartInterface> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/carts/${cid}`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}

export async function postProductInCart(
  cid: string,
  pid: string
): Promise<Response> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/carts/${cid}/product/${pid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}

export async function postPurchase(cid: string): Promise<TicketInterface> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/carts/${cid}/purchase`,
    {
      method: "POST",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}
