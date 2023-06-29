import { useDocumentVisible } from "./hooks/useDocumentVisible.js";
import { useState, useEffect } from "react";

function App() {
  const { count, visible, onVisibilityChange } = useDocumentVisible(0);

  useEffect(() => {
    window.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
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
