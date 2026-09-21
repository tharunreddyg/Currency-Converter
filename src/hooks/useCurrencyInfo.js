import { useEffect, useState } from 'react';

function useCurrencyInfo(currency = 'USD') {
    const [rates, setRates] = useState({});

    useEffect(() => {
        const normalizedCurrency = currency.toUpperCase();

        fetch(`https://open.er-api.com/v6/latest/${normalizedCurrency}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Currency API request failed');
                }
                return res.json();
            })
            .then((response) => {
                setRates(response.rates || {});
            })
            .catch(() => {
                setRates({});
            });
    }, [currency]);

    return rates;
}

export default useCurrencyInfo;
