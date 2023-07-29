import { useEffect, useState } from "react";
import { getProducts } from "../hooks/products";
import { ProductInterface } from "../vite-env";

function Products(): JSX.Element {
  const [products, setProducts] = useState([] as ProductInterface[]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const products: ProductInterface[] = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);
  return (
    <main className="flex flex-col justify-around items-center gap-5 p-5">
      <div className="flex justify-center items-center w-full text-indigo-500 text-xl">
        <h1>Products</h1>
      </div>

      {products.map((product: ProductInterface) => (
        <div
          key={product._id}
          className="flex flex-col flex-wrap justify-center items-start gap-2 rounded-lg border-indigo-400 border-2 p-5 text-indigo-400 w-full"
        >
          <div className="flex justify-center items-center text-indigo-500 text-lg w-full">
            <h2>{product.title}</h2>
          </div>

          <p>{product.description}</p>
          <p>
            <span className="text-indigo-500 text-md">Category: </span>
            {product.category}
          </p>
          <p>
            <span className="text-indigo-500 text-md">Status: </span>
            {product.status}
          </p>
          <p>
            <span className="text-indigo-500 text-md">Stock: </span>
            {product.stock}
          </p>
          <p>
            <span className="text-indigo-500 text-md">Code: </span>
            {product.code}
          </p>
          <p>
            <span className="text-indigo-500 text-md">Price: </span>$
            {product.price}
          </p>
          <p className="flex justify-center items-center w-full py-2">
            {product.thumbnails.map((url: string) => (
              <img
                key={url}
                src={url}
                alt={product.title}
                className="w-20 h-20"
              />
            ))}
          </p>
        </div>
      ))}
    </main>
  );
}

export default Products;
