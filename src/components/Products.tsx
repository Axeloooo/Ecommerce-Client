import { useEffect, useState } from "react";
import { getProducts } from "../functions/products";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { ProductsInterface, ProductInterface } from "../vite-env";
import { postProductInCart } from "../functions/carts";
import { CustomAlert } from "../utils/alert";
import { SweetAlertResult } from "sweetalert2";

function Products(): JSX.Element {
  const [products, setProducts] = useState({} as ProductsInterface);
  const [loading, setLoading] = useState(true as boolean);
  const [error, setError] = useState("" as string);

  const handleAddToCart = async (pid: string, title: string): Promise<void> => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        `Add ${title} to cart?`
      );
      if (result.isConfirmed) {
        const cid: string | null = localStorage.getItem("cid");
        if (cid) {
          await postProductInCart(cid, pid);
          CustomAlert.showConfirmation(`${title} added to cart.`);
        }
      }
    } catch (err) {
      setError("Error adding product to cart.");
      setLoading(false);
    }
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      const products: ProductsInterface = await getProducts();
      setProducts(products);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col justify-around items-center gap-5 p-5">
      <div className="flex justify-center items-center w-full text-indigo-500 text-xl">
        <h1>Products</h1>
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
        products.docs.map((product: ProductInterface) => (
          <div
            key={product._id}
            className="flex justify-around items-center gap-6 rounded-lg border-indigo-400 border-2 p-5 text-indigo-400 w-full"
          >
            <div className="flex justify-center items-center w-full">
              {product.thumbnails.map((url: string) => (
                <img
                  key={url}
                  src={url}
                  alt={product.title}
                  className="w-40 h-52"
                />
              ))}
            </div>

            <div className="flex flex-col flex-wrap justify-evenly items-center text-indigo-500 w-full h-52 gap-1">
              <p className="text-center font-bold text-lg">
                {product.title.length > 25
                  ? product.title.slice(0, 23) + "..."
                  : product.title}
              </p>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p className="hover:text-indigo-400 font-bold">
                <Link to={`/views/products/${product._id}`}>See more</Link>
              </p>
              <button
                onClick={() => handleAddToCart(product._id, product.title)}
                type="button"
                className="rounded-xl bg-indigo-500 text-white p-2 hover:bg-indigo-400"
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
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Products;
