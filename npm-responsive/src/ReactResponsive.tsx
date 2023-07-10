/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from "react";
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

interface QueryTypes {
  orientation?: "portrait" | "landscape";
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number | `${number}px`;
  maxWidth?: number | `${number}px`;
  minHeight?: number | `${number}px`;
  maxHeight?: number | `${number}px`;
}

declare type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export declare type MediaQueryProps = RequireAtLeastOne<QueryTypes> & {
  children: ReactNode | ((matches: boolean) => ReactNode);
};

function makeMediaQuery(props: { [key: string]: string | number }): string {
  function parseToLowerCase(string: string) {
    return string.replace(/(?<=[a-z])(?=[A-Z])/g, "-").toLowerCase();
  }

  return Object.entries(props)
    .map(([key, value], index) => {
      switch (key) {
        case "orientation":
          return `(${key}:${value})`;
        case "minResolution":
        case "maxResolution":
          return typeof value === "number"
            ? `(${parseToLowerCase(key)}: ${value}dppx)`
            : `(${parseToLowerCase(key)}: ${value})`;
        default:
          return typeof value === "number"
            ? `(${parseToLowerCase(key)}: ${value}px)`
            : `(${parseToLowerCase(key)}: ${value})`;
      }
    })
    .join("");
}

export const MediaQuery = ({ children, ...props }: MediaQueryProps) => {
  const newQuery = useMediaQuery({ query: makeMediaQuery(props) });

  return typeof children === "function" ? (
    <>{children(newQuery)}</>
  ) : newQuery ? (
    <>{children}</>
  ) : null;
};
