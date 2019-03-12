import React, { useState } from "react";
import { Home } from "./home/Home";

const App = () => {
    const [hasHome, toggleHome] = useState(true);
    const [count, setCount] = useState(0);
    return (
        <div>
            React TS APP
            <button onClick={() => toggleHome(!hasHome)}>toggle</button>
            <button onClick={() => setCount(count + 1)}>home {count}</button>
            {hasHome && <Home />}
        </div>
    )
}

export default App;