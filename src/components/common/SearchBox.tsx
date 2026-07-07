import { Search, X } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBoxProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;

{
  /* <SearchBox
  value={search}
  onChange={(value) => {
    setSearch(value);
    setPage(1);
  }}
  placeholder="Search by name, SKU or category..."
/> */
}
