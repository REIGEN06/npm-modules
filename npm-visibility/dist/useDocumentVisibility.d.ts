type Callback = (isVisible: boolean) => void;
interface HookTypes {
    count: number;
    visible: boolean;
    onVisibilityChange: (callback: Callback) => void;
}
export declare const useDocumentVisibility: () => HookTypes;
export {};
