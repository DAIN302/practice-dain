import useThrottle from '@/hooks/common/useThrottle';
import SearchIcon from '@icons/search.svg?react';
import { ChangeEvent, useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: Props) {
  const [search, setSearch] = useState('');

  const throttle = useThrottle();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
    throttle(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className="w-full relative">
      <input
        className="w-full rounded-10 h-40 border border-gray200 pl-10 pr-46"
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <SearchIcon className="absolute top-9 right-12" />
    </div>
  );
}
