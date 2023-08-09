import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { TicketInterface } from "../vite-env";
import { CustomAlert } from "../utils/alert";
import { postPurchase } from "../functions/carts";
import Loader from "./Loader";

function PaymentForm() {
  const { cid } = useParams();
  const navigator: NavigateFunction = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false as boolean);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !cid) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!error) {
      const res: TicketInterface = await postPurchase(cid);
      await CustomAlert.showTicket(res);
      navigator("/views/products");
    } else if (error.message) {
      await CustomAlert.showPaymentError(error.message);
      setLoading(false);
    } else {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full h-96 gap-20 pt-20"
    >
      <PaymentElement />
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          <button
            type="submit"
            className="rounded-xl bg-indigo-500 text-white p-2 hover:bg-indigo-400 w-52 flex justify-center items-center shadow-xl"
          >
            Pay
          </button>
        </div>
      )}
    </form>
  );
}

export default PaymentForm;
