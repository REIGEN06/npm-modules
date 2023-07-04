"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentVisibility = void 0;
var react_1 = require("react");
var useDocumentVisibility = function () {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    var _b = (0, react_1.useState)(true), visible = _b[0], setVisible = _b[1];
    var _c = (0, react_1.useState)([]), callbacks = _c[0], setCallbacks = _c[1];
    var increment = function () { return setCount(function (currentCount) { return currentCount + 1; }); };
    var onVisibilityChange = function (callback) {
        setCallbacks(function (callbacks) { return __spreadArray(__spreadArray([], callbacks, true), [callback], false); });
    };
    var Handle = function () {
        setVisible(document.visibilityState === "visible");
        if (document.hidden) {
            increment();
        }
        callbacks.forEach(function (callback) {
            callback(document.visibilityState === "visible");
        });
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener("visibilitychange", Handle);
        return function () {
            document.removeEventListener("visibilitychange", Handle);
        };
    }, [callbacks]);
    return { count: count, visible: visible, onVisibilityChange: onVisibilityChange };
};
exports.useDocumentVisibility = useDocumentVisibility;
