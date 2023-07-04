import { useEffect, useState } from "react";

type Callback = (isVisible: boolean) => void;
interface HookTypes {
  count: number;
  visible: boolean;
  onVisibilityChange: (callback: Callback) => void;
}

export const useDocumentVisibility = (): HookTypes => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [callbacks, setCallbacks] = useState<any[]>([]);

  const increment = () => setCount((currentCount) => currentCount + 1);

  const onVisibilityChange = (callback: Callback) => {
    setCallbacks((callbacks: Array<Callback>) => [...callbacks, callback]);
  };

  const Handle = (): void => {
    setVisible(document.visibilityState === "visible");
    if (document.hidden) {
      increment();
    }
    callbacks.forEach((callback) => {
      callback(document.visibilityState === "visible");
    });
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", Handle);
    return () => {
      document.removeEventListener("visibilitychange", Handle);
    };
  }, [callbacks]);

  return { count, visible, onVisibilityChange };
};