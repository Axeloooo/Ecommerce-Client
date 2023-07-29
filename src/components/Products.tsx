import { useEffect } from "react";
import { getProducts } from "../hooks/products";

function Products(): JSX.Element {
  useEffect(() => {
    const statusCode: Promise<number> = getProducts();
    console.log(statusCode);
  }, []);
  return <div>Products</div>;
}

export default Products;
