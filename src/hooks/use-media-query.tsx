import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const result = () => {
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia(query).matches;
  };

  const [value, setValue] = useState(result);

  function onResize() {
    setValue(result);
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [query]);

  return value;
}
