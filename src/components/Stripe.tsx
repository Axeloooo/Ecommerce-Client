import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useEffect, useState } from "react";
import { postPaymentIntent } from "../functions/stripe";
import Loader from "./Loader";
import { PaymentIntentInterface } from "../vite-env";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

function Stripe(): JSX.Element {
  const total: string = "100";
  const [clientSecret, setClientSecret] = useState("" as string);
  const [loading, setLoading] = useState(true as boolean);

  const paymentIntent = async (): Promise<void> => {
    try {
      const res: PaymentIntentInterface = await postPaymentIntent(total);
      setLoading(false);
      setClientSecret(res.client_secret);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    paymentIntent();
  }, []);

  return (
    <main className="flex flex-col justify-around items-center gap-10x p-5">
      <div className="flex justify-center items-center w-full text-indigo-500 text-xl font-bold shadow-xl rounded-xl bg-white p-5">
        <h1>Payment</h1>
      </div>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Loader key="loader" />
        </div>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <PaymentForm></PaymentForm>
        </Elements>
      )}
    </main>
  );
}

export default Stripe;
