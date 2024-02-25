import { useContext } from "react"; 
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

// eslint-disable-next-line react/prop-types
const Private = ({ children }) => {
  const { signed, loadingDashboard } = useContext(AuthContext);

  if (loadingDashboard) {
    return (
      <div></div>
    );
  }
  if (!signed) {
    return <Navigate to ="/"/>
  }
  return children;
}

export default Private;
