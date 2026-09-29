
import { useMemo, useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo.js';
import CurrencyInput from './Components/CurrencyInput';

function App() {
  const [amount, setAmount] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(currencyFrom);

  const options = useMemo(
    () => Object.keys(currencyInfo || {}),
    [currencyInfo]
  );

  const rate = currencyInfo?.[currencyTo] || 0;
  const convertedValue = Number(amount) * rate;

  const displayedAmount =
    convertedAmount !== 0 ? convertedAmount : convertedValue;

  const handleConvert = () => {
    setConvertedAmount(convertedValue);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setAmount(displayedAmount);
    setConvertedAmount(0);
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          
          {/* Left side */}
          <section className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live exchange rates
            </div>

            <h1 className="max-w-lg text-5xl font-bold leading-[1.08] tracking-tight text-slate-950">
              Convert currencies
              <span className="block text-blue-600">
                without the confusion.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">
              A simple and fast way to convert between currencies using
              up-to-date exchange rates.
            </p>

            <div className="mt-8 flex gap-6 text-sm text-slate-500">
              <div>
                <p className="font-semibold text-slate-900">150+</p>
                <p>currencies</p>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <p className="font-semibold text-slate-900">Live</p>
                <p>exchange rates</p>
              </div>
            </div>
          </section>

          {/* Converter */}
          <section className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7">
              
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Currency converter
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                      Convert money
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                    💱
                  </div>
                </div>
              </div>

              {/* Rate */}
              <div className="mb-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Exchange rate
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {rate
                      ? `1 ${currencyFrom} = ${Number(rate).toFixed(4)} ${currencyTo}`
                      : 'Loading rate...'}
                  </p>
                </div>

                {rate > 0 && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    Live
                  </span>
                )}
              </div>

              {/* From */}
              <CurrencyInput
                label="You send"
                amount={amount}
                currency={currencyFrom}
                onAmountChange={(e) =>
                  setAmount(Number(e.target.value) || 0)
                }
                onCurrencyChange={(e) =>
                  setCurrencyFrom(e.target.value.toUpperCase())
                }
                currencyOptions={options}
                amountDisable={false}
              />

              {/* Swap */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="absolute h-px w-full bg-slate-200" />

                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap currencies"
                  title="Swap currencies"
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                >
                  ⇅
                </button>
              </div>

              {/* To */}
              <CurrencyInput
                label="You receive"
                amount={displayedAmount}
                currency={currencyTo}
                onAmountChange={() => {}}
                onCurrencyChange={(e) =>
                  setCurrencyTo(e.target.value.toUpperCase())
                }
                currencyOptions={options}
                amountDisable={true}
              />

              {/* Convert */}
              <button
                type="button"
                onClick={handleConvert}
                disabled={!amount || !rate}
                className="mt-1 w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                Convert {currencyFrom} → {currencyTo}
              </button>

              {/* Result */}
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-blue-500">
                      You receive
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                      {displayedAmount.toFixed(2)}
                      <span className="ml-2 text-sm font-semibold text-blue-600">
                        {currencyTo}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm">
                    {currencyTo}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Exchange rates are fetched automatically when you change
              currencies.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;

