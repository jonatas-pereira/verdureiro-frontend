/* eslint-disable no-unused-vars */
import { useState, createContext, useEffect } from "react";
import { loginUser, createUser } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [token, setToken] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const loadUser = async () => {
      const storageUser = localStorage.getItem("@ticketsPRO");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoadingDashboard(false);
      }
      setLoadingDashboard(false);
    }
    loadUser();
  }, []);

  async function signIn(email, password) {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      let data = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        avatar: `https://back-end-verdureiro.onrender.com/files/${response.user.avatar}`,
        contact: response.user.contact,
        created_at: response.user.created_at,
        update_at: response.user.update_at,
        token: response.acessToken,
      };
      setUser(data);
      storageUser(data);
      setLoading(false);
      toast.success(`Seja bem vindo ${data.name}`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Ops algo deu errado");
    }
  }

  async function signUp(email, name, password, contact) {
    setLoading(true);

    try {
      const user = await createUser(email, name, password, contact);
      let data = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: `https://back-end-verdureiro.onrender.com/files/${user.avatar}`,
        contact: user.contact,
        created_at: user.created_at,
        update_at: user.update_at,
      };
      setUser(data);
      storageUser(data);
      setLoading(false);
      toast.success("Seja bem vindo a dashboard");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data));
  }

  async function logout() {
    localStorage.removeItem("@ticketsPRO");
    setUser(null);
  }


  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loading,
        loadingDashboard,
        logout,
        storageUser,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
