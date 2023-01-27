import { useEffect, useState } from "react";

/**
 * This React hook helps to limit that the component is re-rendered too many times.
 * Imagine that you want to execute a function on an event that executes several
 * hundred times per second such as moving the mouse or scrolling.
 * This may cause the application to lag. To prevent this,
 * the debounce uses an internal timer to execute the callback function
 * every xx seconds (2nd parameter).
 * https://usehooks-ts.com/react-hook/use-debounce
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
