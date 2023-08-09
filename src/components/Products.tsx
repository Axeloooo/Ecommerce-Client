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
  const [page, setPage] = useState(1 as number);
  const [pageCount, setPageCount] = useState(0 as number);
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

  const handlePrevious = (): void => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNext = (): void => {
    if (page === pageCount) {
      return;
    }
    setPage(page + 1);
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const products: ProductsInterface = await getProducts(page);
      setProducts(products);
      setPage(products.page);
      setPageCount(products.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <main className="flex flex-col justify-around items-center gap-5 p-5">
        <div className="flex justify-center items-center w-full text-indigo-500 text-xl shadow-xl rounded-xl bg-white p-5 font-bold">
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
              className="flex justify-around items-center gap-10 rounded-xl  p-5 text-indigo-400 w-full shadow-xl bg-white"
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
      <footer className="flex justify-center items-center gap-5 p-5">
        <button
          disabled={page === 1}
          onClick={handlePrevious}
          className="text-xl rounded-xl bg-indigo-500 text-white p-2 hover:bg-indigo-400 w-24 shadow-xl"
        >
          Previous
        </button>
        <p className="text-indigo-500 text-xl">{page}</p>
        <button
          disabled={page === pageCount}
          onClick={handleNext}
          className="text-xl rounded-xl bg-indigo-500 text-white p-2 hover:bg-indigo-400 w-24 shadow-xl"
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default Products;
