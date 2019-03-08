import React, { useState } from "react";
import { Home } from "./home/Home";

const App = () => {
    const [hasHome, toggleHome] = useState(true);
    return (
        <div>
            React TS APP
            <button onClick={() => toggleHome(!hasHome)}>toggle</button>
            {hasHome && <Home />}
        </div>
    )
}

export default App;