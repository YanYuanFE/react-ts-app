import React, { useState } from "react";

const App = () => {
    const [ count, setCount ] = useState(0);
    return (
        <div onClick={() => setCount(count + 1)}>
            React TS APP {count}
        </div>
    )
}

export default App;