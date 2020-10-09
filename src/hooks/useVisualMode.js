import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1] || initial;

  function transition(newMode, replace = false) {
    setHistory(
      replace
        ? (prev) => [...prev.slice(0, -1), newMode]
        : (prev) => [...prev, newMode]
    );
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }

  return { mode, transition, back };
}
