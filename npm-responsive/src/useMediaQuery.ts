import { useEffect, useState } from "react";
type UseQueryTypes = {
  query: string;
};

export const useMediaQuery = (query: UseQueryTypes): boolean => {
  const [state, setState] = useState(
    () => window.matchMedia(query.query).matches
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