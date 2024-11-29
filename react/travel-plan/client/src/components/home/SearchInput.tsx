import SearchIcon from "@icons/search.svg?react";
import { useState } from "react";

interface Props {
  onCompositionEnd: (value: string) => void;
}

export default function SearchInput({ onCompositionEnd }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full relative">
      <input
        className="w-full rounded-10 h-40 border border-gray200 pl-10 pr-46"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onCompositionEnd={(e) => onCompositionEnd(e.currentTarget.value)}
      />
      <SearchIcon className="absolute top-9 right-12" />
    </div>
  );
}
