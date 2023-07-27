import { useEffect, useState } from 'react';
type UseQueryTypes = {
	query: string;
};

//отслеживает изменения @media
//отвечает true, если условия в запросе соблюдены
export const useMediaQuery = (
	query: UseQueryTypes,
	defaultValue = false
): boolean => {
	const [state, setState] = useState<boolean>(
		//проверка, чтобы на SSR не было ошибок
		typeof window !== 'undefined'
			? () => window.matchMedia(query.query).matches
			: defaultValue
	);

	useEffect(() => {
		//если условия перестают соблюдаться (и наоборот),
		// то мы кидаем вердикт(true\false) в стейт, дабы вызвать ререндер
		const MediaQueryHandle = () => {
			setState(() => window.matchMedia(query.query).matches);
		};

		const mediaQueryList = window.matchMedia(query.query);

		mediaQueryList.addEventListener('change', MediaQueryHandle);
		return () => {
			mediaQueryList.removeEventListener('change', MediaQueryHandle);
		};
	}, [query]);
	return state;
};
