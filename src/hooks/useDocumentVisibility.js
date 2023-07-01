import { useEffect, useState } from "react";

export const useDocumentVisibility = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const [visible, setVisible] = useState(true);
  const [callbacks, setCallbacks] = useState([]);

  const increment = () => setCount((currentCount) => currentCount + 1);

  const onVisibilityChange = (callback) => {
    setCallbacks((callbacks) => [...callbacks, callback]);
  };

  const Handle = () => {
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
  console.log(callbacks);

  return { count, visible, onVisibilityChange };
};
