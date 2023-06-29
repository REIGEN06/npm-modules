import { useCallback, useState } from "react";

export const useDocumentVisible = (initialValue = 0) => {
  let [count, setCount] = useState(initialValue);
  let [visible, setVisible] = useState(true);

  const increment = useCallback(
    () => setCount((currentCount) => currentCount + 1),
    []
  );

  const onVisibilityChange = () => {
    let state = document.visibilityState;
  };

  return { count, visible, onVisibilityChange };
};
