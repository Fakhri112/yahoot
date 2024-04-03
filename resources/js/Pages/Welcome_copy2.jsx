import React, { useState, useEffect } from "react";

const IncreaseCounter = ({ targetNumber }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const increment = () => {
            if (count < targetNumber) {
                setCount((prevCount) => prevCount + 10);
            }
            if (count >= targetNumber) {
                setCount(targetNumber);
            }
        };

        const interval = setInterval(increment, 5); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [count, targetNumber]);
    return <div>{count}</div>;
};

const Welcome_copy2 = () => {
    const [myNumber, SetMyNumber] = useState(983);

    return (
        <div>
            Welcome_copy2
            <button onClick={() => SetMyNumber(myNumber + 762)}>
                Increase ME
            </button>
        </div>
    );
};

export default Welcome_copy2;
