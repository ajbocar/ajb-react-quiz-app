import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count+1);
  };

  return (
    <>
      <h1>Vite + React + Pico</h1>
      <h4>count is {count}</h4>
      <button onClick={addCount}>+1</button>
    </>
  );
}

export default App;
