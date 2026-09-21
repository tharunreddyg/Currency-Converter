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
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <span className="text-xs text-slate-400">
          {amountDisable ? 'Result' : 'Amount'}
        </span>
      </div>

      <div
        className={`flex items-center overflow-hidden rounded-2xl border bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-200 ${
          amountDisable
            ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 shadow-orange-100'
            : 'border-cyan-200 bg-gradient-to-r from-white via-cyan-50 to-blue-50 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100 shadow-cyan-100'
        }`}
      >
        <input
          type="number"
          min="0"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={onAmountChange}
          disabled={amountDisable}
          className="min-w-0 flex-1 bg-transparent px-4 py-4 text-xl font-semibold text-slate-900 outline-none placeholder:text-slate-300 disabled:cursor-not-allowed disabled:text-slate-600"
        />

        <div className="h-8 w-px bg-slate-200" />

        <select
          value={currency}
          onChange={onCurrencyChange}
          className="max-w-[120px] cursor-pointer appearance-none bg-transparent px-4 py-4 pr-8 text-sm font-bold text-slate-700 outline-none"
        >
          {currencyOptions.map((currencyCode) => (
            <option
              key={currencyCode}
              value={currencyCode}
            >
              {currencyCode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyInput;