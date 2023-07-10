import React from 'react'
import { ReactNode } from "react";
import { useEffect, useState } from "react";
type UseQueryTypes={
    query:string;
}

export const useMediaQuery = (query:UseQueryTypes):boolean=>{
    const [state, setState] = useState(()=>window.matchMedia(query.query).matches);
    const Handle=()=>{
        setState(()=>window.matchMedia(query.query).matches);
    }
    useEffect(()=>{
        const mql = window.matchMedia(query.query);
        
        mql.addEventListener("change", Handle);
        return()=>{
            mql.removeEventListener("change", Handle);
        }
    },[query]);
    return state;
}
//////////////////////////////Начинается компонент
interface QueryTypes{
    orientation:string,
    minResolution:number|string,
    maxResolution:number|string,
    minWidth:number|string,
    maxWidth:number|string,
    minHeight:number|string,
    maxHeight:number|string,
}

declare type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

declare type MediaQueryProps = RequireAtLeastOne<QueryTypes> & {
    children: ReactNode | ((matches: boolean) => ReactNode);
};

function parsePropsKey(string: string) {
    return string.replace(/(?<=[a-z])(?=[A-Z])/g, "-").toLowerCase()
}

function getUnit(key: string, value: any) {
    if (/resolution/i.test(key)) {
        if (typeof value === "number") {
            return `${value}dppx`;
        } else {
            return value;
        }
    }
    if (/width/i.test(key) || /height/i.test(key)) {
        return `${value}px`;
    }
    return value;
}

export function MediaQuery(props: MediaQueryProps) {
    const generatorMediaQuery = (): string => {
        const entries = Object.entries(props);
        return entries.map(([key, value], index) => {if (key !== "children") {return `(${parsePropsKey(key)}: ${getUnit(
                        key,
                        value
                    )})`;
                } else {
                    return "";
                }
            })
            .join("");
    };

    const makeHook = useMediaQuery({ query: generatorMediaQuery() });

    return (typeof props.children === "function")?<>{props.children(makeHook)}</>:(makeHook)?<>{props.children}</>:null
}
