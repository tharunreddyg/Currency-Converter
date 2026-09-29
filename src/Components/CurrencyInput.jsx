
function CurrencyInput({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  amountDisable = false,
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {amountDisable ? 'Result' : 'Amount'}
        </span>
      </div>

      <div
        className={`
          flex overflow-hidden rounded-2xl border bg-white
          transition-all duration-200
          ${
            amountDisable
              ? 'border-blue-100 bg-blue-50/30'
              : 'border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10'
          }
        `}
      >
        <input
          type="number"
          min="0"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={onAmountChange}
          disabled={amountDisable}
          aria-label={`${label} amount`}
          className="
            min-w-0 flex-1
            bg-transparent
            px-4 py-4
            text-xl font-semibold
            text-slate-950
            outline-none
            placeholder:text-slate-300
            disabled:cursor-not-allowed
            disabled:text-slate-700
          "
        />

        <div className="my-3 w-px bg-slate-200" />

        <div className="relative flex w-[105px] items-center">
          <select
            value={currency}
            onChange={onCurrencyChange}
            aria-label={`${label} currency`}
            className="
              h-full w-full
              cursor-pointer
              appearance-none
              bg-transparent
              px-3 pr-8
              text-sm font-bold
              text-slate-700
              outline-none
            "
          >
            {currencyOptions.map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-3 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}

export default CurrencyInput;

