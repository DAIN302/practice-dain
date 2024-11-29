import SearchIcon from "@icons/search.svg?react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onCompositionEnd: (value: string) => void;
}

export default function SearchInput({
  value,
  onChange,
  onCompositionEnd,
}: Props) {
  return (
    <div className="w-full relative">
      <input
        className="w-full rounded-10 h-40 border border-gray200 pl-10 pr-46"
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onCompositionEnd={(e) => onCompositionEnd(e.currentTarget.value)}
      />
      <SearchIcon className="absolute top-9 right-12" />
    </div>
  );
}
