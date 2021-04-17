import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {

            if (body) {
                headers['Content-Type'] = 'application/json'
            }
            
            const response = await fetch(url, { method, body, headers })
            const data = response.json();

            await data.then(res => { return setError(res.message) });

            if (!response.ok) {
                setLoading(false);
                return new Error(error || "Something went wrong");
            }

            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, [error])

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError }
}