import { useState } from "react";

export const useDocumentVisibility = (initialValue = 0) => {
  let [count, setCount] = useState(initialValue);
  let [visible, setVisible] = useState(true);

  const increment = () => setCount((currentCount) => currentCount + 1);

  //Можно работать через document.visibilityState, но тогда придется
  // обрабатывать строковые значения. Сейчас все работает через boolean
  const onVisibilityChange = () => {
    setVisible(!document.hidden); //потому что не существует метода document.visible
    console.log("isVisible:", !visible);
    if (!visible) {
      increment();
    }
  };

  return { count, visible, onVisibilityChange };
};
