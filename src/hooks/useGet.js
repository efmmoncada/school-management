import { useState, useEffect } from 'react';

const useGet = initalUrl => {
    const [url, setUrl] = useState(initalUrl);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseBody = await response.json();
                if (responseBody) setData(Array.from(responseBody.data) || []);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            setLoading(false);
        }
        if (url) fetchData();
    }, [url]);

    return [{ data, isLoading, error }, setUrl];
};
export default useGet;
