import React, {useState, useEffect} from 'react'
// useDebounce : 검색할 때, 지속적으로 요청하면 성능에 문제가 있으므로 delay 후 검색 요청

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(value)
      }, delay);
    
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])
    
  return debounceValue;
}
