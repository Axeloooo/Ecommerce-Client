import { FormEvent, ChangeEvent, useState } from "react";
import { loginUser } from "../hooks/auth";
import { loggedUser } from "../vite-env";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as loggedUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const statusCode: number = await loginUser(formData);

    if (statusCode === 200) {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-5 pt-10 px-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-around items-center text-indigo-500 gap-3 w-full">
        <h1 className="text-lg">Email</h1>
        <div className="flex gap-2 justify-around content-evenly">
          <input
            placeholder="Email"
            type="email"
            className="border-2 border-indigo-500 rounded-lg text-center w-full"
            name="email"
            onChange={handleChange}
            required
          ></input>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center text-indigo-500 gap-3 w-full">
        <h1 className="text-lg">Password</h1>
        <div className="flex gap-2 justify-around">
          <input
            placeholder="Password"
            type="password"
            className="border-2 border-indigo-500 rounded-lg text-center w-full"
            name="password"
            onChange={handleChange}
            required
          ></input>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center text-indigo-500 gap-3 w-full pt-10">
        <div className="flex justify-center w-full gap-10 px-10">
          <button
            type="submit"
            className="rounded-xl bg-indigo-500 text-white p-2 text-lg w-full"
          >
            Submit
          </button>
          <button
            type="reset"
            className="rounded-xl bg-red-500 text-white p-2 text-lg w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
