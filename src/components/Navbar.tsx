import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="w-full">
      <div className="w-full text-center p-6 bg-indigo-500 text-2xl text-white">
        <h1>Ecommerce</h1>
      </div>
      <div>
        <ul className="flex flex-row justify-around p-5 bg-indigo-400 text-white rounded-b-3xl">
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
