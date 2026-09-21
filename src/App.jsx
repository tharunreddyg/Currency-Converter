import { useMemo, useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo.js';
import CurrencyInput from './Components/CurrencyInput';

function App() {
  const [amount, setAmount] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(currencyFrom);
  const options = useMemo(() => Object.keys(currencyInfo || {}), [currencyInfo]);

  const rate = currencyInfo?.[currencyTo] || 0;
  const convertedValue = Number(amount) * rate;
  const displayedAmount = convertedAmount || convertedValue;

  const handleConvert = () => {
    setConvertedAmount(convertedValue);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setAmount(convertedAmount || convertedValue);
    setConvertedAmount(0);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.25),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.28),_transparent_26%),linear-gradient(135deg,#070b17_0%,#111827_22%,#1e1b4b_50%,#0f172a_100%)] px-4 py-10 text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(7,11,23,0.88),rgba(15,23,42,0.74),rgba(30,27,75,0.68))]" />
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="absolute bottom-10 right-8 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="absolute bottom-20 left-12 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="mx-auto flex min-h-[90vh] max-w-xl items-center justify-center">
        <div className="w-full">
          <div className="mb-8 text-center text-white">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/25 via-blue-500/25 to-violet-500/25 text-3xl shadow-[0_0_30px_rgba(34,211,238,0.5)] backdrop-blur-md">
              💱
            </div>
            <span className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              Live FX
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Currency Converter
            </h1>
            <p className="mt-3 text-sm text-blue-100/75 sm:text-base">
              Fast, clear exchange rates for today’s market.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/20 bg-white/85 p-5 shadow-[0_35px_100px_rgba(15,23,42,0.75)] backdrop-blur-xl ring-1 ring-white/30 sm:p-7">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 shadow-[0_10px_30px_rgba(59,130,246,0.12)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Market rate
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {rate ? `1 ${currencyFrom} = ${Number(rate).toFixed(4)} ${currencyTo}` : 'Loading rates...'}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600">
                ✓
              </div>
            </div>

            <CurrencyInput
              label="You send"
              amount={amount}
              currency={currencyFrom}
              onAmountChange={(e) => setAmount(Number(e.target.value) || 0)}
              onCurrencyChange={(e) => setCurrencyFrom(e.target.value.toUpperCase())}
              currencyOptions={options}
              amountDisable={false}
            />

            <div className="relative my-2 flex justify-center">
              <div className="absolute left-0 top-1/2 h-px w-full bg-slate-200" />
              <button
                type="button"
                onClick={handleSwap}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200 bg-gradient-to-br from-cyan-400 to-blue-500 text-xl text-white shadow-[0_12px_25px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(59,130,246,0.45)] active:scale-95"
                title="Swap currencies"
                aria-label="Swap currencies"
              >
                ⇅
              </button>
            </div>

            <CurrencyInput
              label="You receive"
              amount={displayedAmount}
              currency={currencyTo}
              onAmountChange={() => {}}
              onCurrencyChange={(e) => setCurrencyTo(e.target.value.toUpperCase())}
              currencyOptions={options}
              amountDisable={true}
            />

            <button
              type="button"
              onClick={handleConvert}
              disabled={!amount || !rate}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-4 text-sm font-bold tracking-wide text-white shadow-[0_18px_35px_rgba(249,115,22,0.45)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_22px_45px_rgba(236,72,153,0.50)] active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
            >
              Convert {currencyFrom} → {currencyTo}
            </button>

            <div className="mt-5 rounded-2xl bg-gradient-to-r from-pink-50 via-orange-50 to-yellow-50 p-4 shadow-inner shadow-orange-100 ring-1 ring-orange-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                    {displayedAmount.toFixed(2)} <span className="text-base text-blue-600">{currencyTo}</span>
                  </p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-pink-100 to-orange-100 px-3 py-1 text-xs font-bold text-orange-700 shadow-sm">
                  {currencyTo}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-blue-100/60">
            Exchange rates update automatically as the market changes.
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;