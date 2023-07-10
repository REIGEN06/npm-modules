import { ReactNode } from "react";
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
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
type MediaQueryProps = RequireAtLeastOne<QueryTypes> & {
    children: ReactNode | ((matches: boolean) => ReactNode);
};
export declare const MediaQuery: ({ children, ...props }: MediaQueryProps) => JSX.Element | null;
export {};