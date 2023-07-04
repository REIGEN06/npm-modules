"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaQuery = exports.useMediaQuery = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useMediaQuery = (query) => {
    const [state, setState] = (0, react_1.useState)(() => window.matchMedia(query.query).matches);
    const Handle = () => {
        setState(() => window.matchMedia(query.query).matches);
    };
    (0, react_1.useEffect)(() => {
        const mql = window.matchMedia(query.query);
        mql.addEventListener("change", Handle);
        return () => {
            mql.removeEventListener("change", Handle);
        };
    }, [query]);
    return state;
};
exports.useMediaQuery = useMediaQuery;
function parsePropsKey(string) {
    return string.replace(/(?<=[a-z])(?=[A-Z])/g, "-").toLowerCase();
}
function getUnit(key, value) {
    if (/resolution/i.test(key)) {
        if (typeof value === "number") {
            return `${value}dppx`;
        }
        else {
            return value;
        }
    }
    if (/width/i.test(key) || /height/i.test(key)) {
        return `${value}px`;
    }
    return value;
}
function MediaQuery(props) {
    const generatorMediaQuery = () => {
        const entries = Object.entries(props);
        return entries
            .map(([key, value], index) => {
            if (key !== "children") {
                return `(${parsePropsKey(key)}: ${getUnit(key, value)})`;
            }
            else {
                return "";
            }
        })
            .join("");
    };
    const makeHook = (0, exports.useMediaQuery)({ query: generatorMediaQuery() });
    if (typeof props.children === "function") {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.children(makeHook) }));
    }
    else if (makeHook) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.children }));
    }
    else {
        return null;
    }
}
exports.MediaQuery = MediaQuery;
