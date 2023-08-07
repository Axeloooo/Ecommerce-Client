import { PaymentIntentInterface } from "../vite-env";

export async function postPaymentIntent(
  total: string
): Promise<PaymentIntentInterface> {
  const res: Response = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/payments/payment-intents?total=${total}`,
    {
      method: "POST",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}
