import { useEffect, useState } from 'react';

function useCurrencyInfo(currency = 'usd') {
    const [data, setData] = useState({});

    useEffect(() => {
        const normalizedCurrency = currency.toLowerCase();

        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${normalizedCurrency}.json`)
            .then((res) => res.json())
            .then((response) => setData(response[normalizedCurrency] || {}))
            .catch(() => setData({}));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;