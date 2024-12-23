import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type={"button"}
        className={"text-blue-500"}
        onClick={() => setCount(count => count + 1)}
      >
        count is {count}
      </button>
    </>
  );
}

export default App;
