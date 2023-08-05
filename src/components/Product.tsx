import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../vite-env";
import { getProductById } from "../functions/products";
import Loader from "./Loader";
import { CustomAlert } from "../utils/alert";
import { SweetAlertResult } from "sweetalert2";
import { deleteProductFromCart, postProductInCart } from "../functions/carts";

function Product() {
  const { pid } = useParams();
  const [product, setProduct] = useState({} as ProductInterface);
  const [loading, setLoading] = useState(true as boolean);
  const [error, setError] = useState("" as string);

  const fetchProduct = async (): Promise<void> => {
    try {
      if (pid) {
        const product: ProductInterface = await getProductById(pid);
        setProduct(product);
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching product.");
      setLoading(false);
    }
  };

  const handleAddToCart = async (title: string): Promise<void> => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        `Add ${title} to cart?`
      );
      if (result.isConfirmed) {
        const cid: string | null = localStorage.getItem("cid");
        if (cid && pid) {
          await postProductInCart(cid, pid);
          CustomAlert.showConfirmation(`${title} added to cart.`);
        }
      }
    } catch (err) {
      setError("Error adding product to cart.");
      setLoading(false);
    }
  };

  const handleDeleteFromCart = async (title: string): Promise<void> => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        `Delete ${title} from cart?`
      );
      if (result.isConfirmed) {
        const cid: string | null = localStorage.getItem("cid");
        if (cid && pid) {
          await deleteProductFromCart(cid, pid);
          CustomAlert.showConfirmation(`${title} deleted from cart.`);
        }
      }
    } catch (err) {
      setError("Error deleting product from cart.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="p-5">
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Loader key="loader" />
        </div>
      ) : error ? (
        <div className="text-red-500 w-full flex justify-center items-center h-96">
          Error: {error}
        </div>
      ) : (
        <div className="flex flex-col gap-3 text-indigo-500 rounded-lg border-indigo-500 border-2 p-5">
          <div className="flex justify-center items-center font-bold text-xl">
            <p>{product.title}</p>
          </div>
          <div className="flex justify-center items-center py-5">
            <img
              key={product.thumbnails[0]}
              src={product.thumbnails[0]}
              alt={product.title}
              className="w-40 h-52"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-6 font-semibold">
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Code: {product.code}</p>
            <p>Stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
          </div>
          <div className="flex justify-around gap-3 items-center w-full py-5">
            <button
              onClick={() => handleAddToCart(product.title)}
              type="button"
              className="rounded-xl bg-indigo-500 text-white p-2 hover:bg-indigo-400 w-52 flex justify-center items-center"
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
                <circle cx="10" cy="20.5" r="1" />
                <circle cx="18" cy="20.5" r="1" />
                <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteFromCart(product.title)}
              type="button"
              className="rounded-xl bg-red-500 text-white p-2 hover:bg-red-400 w-52 flex justify-center items-center"
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
      )}
    </main>
  );
}

export default Product;
