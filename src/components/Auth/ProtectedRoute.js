import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const canProceed = useSelector((state) => state.email.canProceed);

    // Ensure element is a valid React component
    if (!React.isValidElement(element) && typeof element === 'function') {
        element = React.createElement(element);
    }

    return canProceed ? element : <Navigate to="/forgot-password" />;
};

export default ProtectedRoute;
