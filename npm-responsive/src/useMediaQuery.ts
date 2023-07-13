import { useEffect, useState } from "react";
type UseQueryTypes = {
  query: string;
};

export const useMediaQuery = (query: UseQueryTypes, defaultValue = false): boolean => {
  const [state, setState] = useState<boolean>(
    typeof window !== "undefined"
    ? () => window.matchMedia(query.query).matches
    : defaultValue
  );

  useEffect(() => {
    const MediaQueryHandle = () => {
      setState(() => window.matchMedia(query.query).matches);
    };

    const mediaQueryList = window.matchMedia(query.query);

    mediaQueryList.addEventListener("change", MediaQueryHandle);
    return () => {
      mediaQueryList.removeEventListener("change", MediaQueryHandle);
    };
  }, [query]);
  return state;
};