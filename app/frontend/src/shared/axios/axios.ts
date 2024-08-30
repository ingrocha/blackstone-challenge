import axios from 'axios';

const axiosInstance = axios.create({
	baseURL:
		process.env.NX_PUBLIC_AXIOS_BASE_URL || 'http://localhost:3000/api/v1/', // Replace with your API base URL
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export default axiosInstance;
