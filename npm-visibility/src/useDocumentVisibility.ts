import React from "react";
import { useEffect, useRef, useState } from "react";

type Callback = (isVisible: boolean) => void;

interface HookTypes {
  count: number;
  visible: boolean;
  onVisibilityChange: (callback: Callback) => void;
}

export const useDocumentVisibility = (): HookTypes => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const onVisibilityCallback = useRef<Callback[]>([]);

  const increment = () => setCount((currentCount) => currentCount + 1);

  const onVisibilityChange = (callback: Callback) => {
    onVisibilityCallback.current.push(callback);
  };

  const DocumentVisibilityHandle = (): void => {
    setVisible(document.visibilityState === "visible");
    if (document.hidden) {
      increment();
    }
    onVisibilityCallback.current.forEach((callback) =>
      callback(document.visibilityState === "visible")
    );
  };
  console.log(onVisibilityChange);

  useEffect(() => {
    document.addEventListener("visibilitychange", DocumentVisibilityHandle);
    return () => {
      document.removeEventListener(
        "visibilitychange",
        DocumentVisibilityHandle
      );
    };
  }, []);

  return { count, visible, onVisibilityChange };
};
