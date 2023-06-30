import { useDocumentVisibility } from "./hooks/useDocumentVisibility.js";
import {useEffect } from "react";

function App() {
  const { count, visible, onVisibilityChange } = useDocumentVisibility(0);

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log('first handler', isVisible)
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
      console.log('second handler', isVisible)
    });

    setTimeout(() => unsubscribeSecondHandler, 5000); // отписываемся от 'second handler' через 5 секунд

    window.addEventListener("visibilitychange", onVisibilityChange);
    console.log('setup');
    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
      console.log('setout');
    };
  }, [visible]);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна?{" "}
        {visible ? "да" : "нет"}
      </span>
    </div>
  );
}

export default App;
