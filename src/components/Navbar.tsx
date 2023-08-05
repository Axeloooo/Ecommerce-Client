import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { logoutUser } from "../functions/auth";
import { CustomAlert } from "../utils/alert";
import { SweetAlertResult } from "sweetalert2";

function Navbar(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      const result: SweetAlertResult<any> = await CustomAlert.showAlert(
        "Are you sure you want to logout?"
      );
      if (result.isConfirmed) {
        const statusCode: number = await logoutUser();
        if (statusCode === 200) {
          await CustomAlert.showConfirmation("Logged out successfully!");
          logout();
          navigate("/auth/login");
        }
      }
    } catch (err) {
      console.error("Error logging out.", err);
    }
  };

  return (
    <nav className="w-full">
      <div className="w-full text-center p-6 bg-indigo-500 text-2xl text-white">
        <h1>Game Heaven</h1>
      </div>
      {isAuthenticated ? (
        <div>
          <ul className="flex flex-row justify-around p-3 bg-indigo-400 text-white rounded-b-3xl">
            <li className="hover:opacity-50">
              <Link
                to={"/views/products"}
                className=" flex flex-col justify-center items-center"
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
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <p className="text-xs">Products</p>
              </Link>
            </li>
            <li className="hover:opacity-50">
              <Link
                to="/views/carts"
                className=" flex flex-col justify-center items-center"
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
                <p className="text-xs">Cart</p>
              </Link>
            </li>
            <li className="hover:opacity-50">
              <Link
                to="/views/profile"
                className=" flex flex-col justify-center items-center"
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
                  <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                  <circle cx="12" cy="10" r="3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <p className="text-xs">Profile</p>
              </Link>
            </li>
            <li className="hover:opacity-50">
              <button
                onClick={handleLogout}
                className=" flex flex-col justify-center items-center"
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <p className="text-xs">Logout</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul className="flex flex-row justify-around p-5 bg-indigo-400 text-white rounded-b-3xl">
            <li className="hover:opacity-50">
              <Link to="/auth/login">Login</Link>
            </li>
            <li className="hover:opacity-50">
              <Link to="/auth/register">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
