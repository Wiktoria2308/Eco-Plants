import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAdminAuth = ({ children, redirectTo = "/" }) => {
	const { isAdmin } = useAuthContext();

	return isAdmin ? children : <Navigate to={redirectTo} />;
};

export default RequireAdminAuth;