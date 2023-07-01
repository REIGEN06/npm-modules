import { useDocumentVisibility } from "./hooks/useDocumentVisibility.js";
import { useEffect } from "react";

function App() {
  const { count, visible, onVisibilityChange } = useDocumentVisibility(0);

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
