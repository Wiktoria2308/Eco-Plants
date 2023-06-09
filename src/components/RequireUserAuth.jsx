import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireUserAuth = ({ children, redirectTo = "/login" }) => {
	const { currentUser } = useAuthContext();

	return currentUser ? children : <Navigate to={redirectTo} />;
};

export default RequireUserAuth;

