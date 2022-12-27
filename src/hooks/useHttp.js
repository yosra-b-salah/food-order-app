import { useState, useCallback } from 'react'

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const sendRequest = useCallback(async (apiConfig, callback = () => { }) => {


		setIsLoading(true);
		setError(null);

		try {

			const { url, method, headers, body } = apiConfig;

			const fetchApiResponse = await fetch(url, {
				method: method || 'GET',
				headers: headers || {},
				body: JSON.stringify(body) || null
			})

			if (!fetchApiResponse.ok) {
				throw new Error('Request failed!');
			}

			const response = await fetchApiResponse.json();
			setIsLoading(false);
			callback(response);

		} catch (error) {
			setError(error.message || 'Something went wrong!');
		}

		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest
	}
}

export default useHttp