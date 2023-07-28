import { useEffect } from "react";
import { getProducts } from "../hooks/products";

export default function Products() {
  useEffect(() => {
    getProducts();
  }, []);
  return <div>Products</div>;
}
