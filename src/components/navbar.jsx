import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../context/userAuth.Context";

const logout = async (navigate) => {
  try {
    await axios.get("http://localhost:5000/api/v1/userAuth/logout");
    toast.success("User Logged Out Successfully!!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const Navbar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div className="h-[65px] p-8 text-white font-semibold bg-black flex justify-between items-center">
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div>Authentication</div>
      <div className="flex gap-6">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </div>
      <div className="flex gap-6">
        {user ? (
          <>
            <p>{user.username}</p>
            <p
              className="cursor-pointer hover:text-red-500"
              onClick={handleLogout}
            >
              Logout
            </p>
          </>
        ) : (
          <>
            <p>Guest</p>
            <Link to={"login"}>
              <p>Login</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
