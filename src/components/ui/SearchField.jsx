import { Search } from "lucide-react";
 
export default function SearchField({
  value,
  onChange,
  placeholder = "Type brand name…",
  className = "",
  showIcon = true,
  ...inputProps
}) {
  return (
    <div className={`relative ${className}`.trim()}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-3 w-full rounded border border-neutral-300 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-full ${showIcon ? "pl-3 pr-10" : "px-3"}`}
        {...inputProps}
      />
      {showIcon ? (
        <Search
          size={20}
          className="pointer-events-none absolute right-3 top-[60%] -translate-y-1/2 text-gray-400"
          aria-hidden
          strokeWidth={2}
        />
      ) : null}
    </div>
  );
}
