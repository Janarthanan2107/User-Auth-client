import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const getUser = async () => {
    try {
      setUser(storedUser);
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while fetching user data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const contextValue = { user, loading, error };

  return (
    <UserContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
