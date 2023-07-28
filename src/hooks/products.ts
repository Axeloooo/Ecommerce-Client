const API: string = "https://ecommerce-api-production-c90c.up.railway.app";
// const API: string = "http://localhost:8080";

export const getProducts = async () => {
  const res: Response = await fetch(`${API}/api/products`, {
    method: "GET",
    credentials: "include",
  });
  console.log(await res.json());
};
