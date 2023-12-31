import { ReactNode } from 'react';
import React from 'react';
import { useMediaQuery } from './useMediaQuery';

interface QueryTypes {
	orientation?: 'portrait' | 'landscape';
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

type MediaQueryProps = RequireAtLeastOne<QueryTypes> & {
	children: ReactNode | ((matches: boolean) => ReactNode);
};

//приводит строку minWidth к min-width
function parseToLowerCase(string: string) {
	return string.replace(/(?<=[a-z])(?=[A-Z])/g, '-').toLowerCase();
}

//преобразует minWidth, 624 к (min-width: 624px)
//если параметров несколько, то ставит между ними and, чтобы @media схавал
function makeMediaQuery(props: { [key: string]: string | number }): string {
	return Object.entries(props)
		.map(([key, value], index) => {
			switch (key) {
				case 'orientation':
					return `(${key}:${value})`;
				case 'minResolution':
				case 'maxResolution':
					return typeof value === 'number'
						? `(${parseToLowerCase(key)}: ${value}dppx)`
						: `(${parseToLowerCase(key)}: ${value})`;
				default:
					return typeof value === 'number'
						? `(${parseToLowerCase(key)}: ${value}px)`
						: `(${parseToLowerCase(key)}: ${value})`;
			}
		})
		.join(' and ');
}

//отдаем готовенькие пропсы на съедение нашему хуку
export const MediaQuery = ({ children, ...props }: MediaQueryProps) => {
	const newQuery = useMediaQuery({ query: makeMediaQuery(props) });
	//проверка на то, что внутри может быть еще один компонент MediaQuery
	return typeof children === 'function' ? (
		<>{children(newQuery)}</>
	) : newQuery ? (
		<>{children}</>
	) : null;
};
