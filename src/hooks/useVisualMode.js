// import {useState} from 'react'

// function useVisualMode(initialMode) {
//   const [mode, setMode] = useState(initialMode)
//   const [history, setHistory] = useState([initialMode]);
//   const transition = (newMode, replacing = false)=>{
//     setMode(newMode);
//     if(replacing){
//       const newHistory = pop();
//       setHistory(newHistory.concat(newMode))
//     } else {
//       setHistory([...history, newMode])
//     }
//   }
//   const pop = () => {
//     return history.slice(0, history.length -1);
//   }
//   const back = ()=>{
//     if(history.length > 1){
//       const newHistory = pop();
//       setMode(newHistory[newHistory.length-1])
//       setHistory(newHistory)
//     }    
//   }
//   return {
//     mode,
//     transition,
//     back
//   }

// }

// export default useVisualMode;

import {useState} from 'react'

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1] || initial;

  function transition(newMode, replace = false) {
    setHistory(replace ? prev => [...prev.slice(0, -1), newMode] : prev =>[...prev, newMode]);
  }

  function back() {
    if(history.length > 1){
      setHistory(prev => [...prev.slice(0, -1)]) 
    } 
  }

  return { mode, transition, back };
}