import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export const ProtectedRoute = ({
	token,
	children,
}: {
	token: string;
	children: ReactNode;
}) => {
	if (token === '') {
		return <Navigate to="/auth/login" replace />;
	}
	return children;
};
