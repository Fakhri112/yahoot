import React, { useEffect, useState } from "react";

const IncreaseCounter = ({ targetNumber, start }) => {
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

        if (!start) return setCount(targetNumber);
        const interval = setInterval(increment, 4); // Adjust the interval as needed
        return () => clearInterval(interval);
    }, [count, targetNumber]);
    return <>{count}</>;
};

export default IncreaseCounter;
