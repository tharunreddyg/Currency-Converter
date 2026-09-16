

function CurrencyConverter() {
    return (
        <>
           

            <div className="bg-gray-100 min-h-screen flex items-center justify-center color-aqua flex-col">
                <div className="bg-white color-aqua p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4">From Currency</h1>
                    <input type="text" className="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Enter amount" />
                    <select className="border border-gray-300 p-2 rounded w-full mb-4">
                        <option value="usd">USD</option>
                    </select>
                </div>

                <div className="bg-white color-aqua p-8 rounded shadow-md w-full max-w-md mt-4">
                    <h1 className="text-2xl font-bold mb-4">To Currency</h1>
                    <select className="border border-gray-300 p-2 rounded w-full mb-4">
                        <option value="eur">EUR</option>
                    </select>
                    <input type="text" className="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Converted amount" />
                </div>

                <button className="bg-blue-500 text-white p-2 rounded w-full max-w-md mt-4">Convert</button>
            </div>
        </>
    );
}

export default CurrencyConverter;