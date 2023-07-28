import { useEffect, useState } from "react";
import { getProducts } from "../hooks/products";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  return <div>Products</div>;
}
