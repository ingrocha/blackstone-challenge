export const authHeader = () => {
	// return authorization header with jwt token
	const token: string = localStorage.getItem('token') || '';

	if (token) {
		return {
			Authorization: `Bearer ${token}`,
		};
	} else {
		return {};
	}
};
