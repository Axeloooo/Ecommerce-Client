import { useEffect, useState } from "react";
import {
  deleteProductFromCart,
  getCartById,
  postPurchase,
} from "../functions/carts";
import Loader from "./Loader";
import { CartInterface, CartItemInterface, TicketInterface } from "../vite-env";
import { Link } from "react-router-dom";
import { CustomAlert } from "../utils/alert";
import { SweetAlertResult } from "sweetalert2";

function Cart() {
  const [total, setTotal] = useState(0 as number);
  const [cart, setCart] = useState({} as CartInterface);
  const [loading, setLoading] = useState(true as boolean);
  const [error, setError] = useState("" as string);
  const [deleted, setDeleted] = useState(false as boolean);

  const handleCheckout = async () => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        "Proceed with purchase?"
      );
      if (result.isConfirmed) {
        const cid: string | null = localStorage.getItem("cid");
        if (cid) {
          const res: TicketInterface = await postPurchase(cid);
          await CustomAlert.showTicket(res);
          setLoading(true);
          setDeleted(true);
        }
      }
    } catch (err) {
      setError("Error checking out the products.");
      setLoading(false);
    }
  };

  const handleDelete = async (pid: string, title: string): Promise<void> => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        `Delete ${title} from cart?`
      );
      if (result.isConfirmed) {
        const cid: string | null = localStorage.getItem("cid");
        if (cid) {
          await deleteProductFromCart(cid, pid);
          await CustomAlert.showConfirmation(`${title} deleted from cart.`);
          setLoading(true);
          setDeleted(true);
        }
      }
    } catch (err) {
      setError("Error deleting product from cart.");
    }
  };

  const getCart = async (): Promise<void> => {
    try {
      const cid: string | null = localStorage.getItem("cid");
      if (cid) {
        const cart: CartInterface = await getCartById(cid);
        const total: number = cart.products.reduce(
          (acc: number, item: CartItemInterface) =>
            acc + item.product.price * item.quantity,
          0
        );
        setTotal(total);
        setCart(cart);
        setLoading(false);
        return;
      }
      setError("Error retrieving cart ID.");
      setLoading(false);
    } catch (err) {
      setError("Error fetching cart.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setDeleted(false);
    getCart();
  }, [deleted]);

  return (
    <main className="flex flex-col justify-around items-center gap-5 p-5">
      <div className="flex justify-between items-center w-full text-indigo-500 text-xl">
        <h1>Cart</h1>
        <button
          onClick={handleCheckout}
          type="button"
          className="rounded-xl bg-green-600 hover:bg-green-500 text-white p-2"
        >
          Checkout
        </button>
      </div>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Loader key="loader" />
        </div>
      ) : error ? (
        <div className="text-red-500 w-full flex justify-center items-center h-96">
          Error: {error}
        </div>
      ) : (
        cart.products.map((item: CartItemInterface) => (
          <div
            key={item._id}
            className="flex justify-around items-center gap-6 rounded-lg border-indigo-400 border-2 p-5 text-indigo-400 w-full"
          >
            <div className="flex justify-center items-center w-full">
              {item.product.thumbnails.map((url: string) => (
                <img
                  key={url}
                  src={url}
                  alt={item.product.title}
                  className="w-40 h-52"
                />
              ))}
            </div>

            <div className="flex flex-col flex-wrap justify-evenly items-center text-indigo-500 w-full h-52 gap-1">
              <p className="text-center font-bold text-lg">
                {item.product.title.length > 25
                  ? item.product.title.slice(0, 23) + "..."
                  : item.product.title}
              </p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
              <p className="hover:text-indigo-400 font-bold">
                <Link to={`/views/products/${item.product._id}`}>See more</Link>
              </p>
              <button
                onClick={() =>
                  handleDelete(item.product._id, item.product.title)
                }
                type="button"
                className="rounded-xl bg-red-500 text-white p-2 hover:bg-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-between border-indigo-500 py-5 border-t-2 items-center w-full text-indigo-500 text-xl">
        <p className="font-bold">Total: ${total}</p>
        <button
          onClick={handleCheckout}
          type="button"
          className="rounded-xl bg-green-600 text-white p-2 hover:bg-green-500"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}

export default Cart;
