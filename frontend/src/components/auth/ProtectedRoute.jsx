import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children }) => {
    const user = authService.getCurrentUser();
    
    if (!user) {
        // Redirect ke login jika tidak ada user
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;