import { useState, useEffect } from 'react';

const createURI = (url, reqData) => {
    let uri = url;
    if (reqData) {
        uri += '?';
        Object.keys(reqData).forEach((key, index) => {
            if (typeof key === 'string') {
                uri += `${key}="${reqData[key]}"`;
            } else {
                uri += `${key}=${reqData[key]}`;
            }
            if (index !== Object.keys(reqData).length - 1) uri += '&';
        });
    }
    return uri;
};

const useRequest = initalUrl => {
    const [url, setUrl] = useState(initalUrl);
    const [reqData, setReqData] = useState({});
    const [method, setMethod] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData(uri) {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(uri, {
                    method: method || 'GET',
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

        if (url && method === 'GET') {
            fetchData(url);
        } else if (url && method && Object.keys(reqData).length) {
            fetchData(createURI(url, reqData));
        }
    }, [url, reqData, method]);

    return [{ data, isLoading, error }, setUrl, setReqData, setMethod];
};
export default useRequest;
