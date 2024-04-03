import { useState, useEffect } from "react";
import { setInterval, clearInterval } from "worker-timers";
let timer;

const useTimeCountdown = (initialValue) => {
    const [time, SetTime] = useState(initialValue);
    const [StartTime, SetStartTime] = useState(false);
    const [ClearTime, SetClearTime] = useState(false);

    useEffect(() => {
        if (!StartTime) return;

        timer = setInterval(() => {
            SetTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    SetStartTime(false);
                    return 0;
                } else {
                    return prevTime - 10;
                }
            });
        }, 10);
    }, [StartTime]);

    useEffect(() => {
        if (ClearTime) return clearInterval(timer);
    }, [ClearTime]);

    return {
        time,
        StartTime,
        ClearTime,
        SetTime,
        SetStartTime,
        SetClearTime,
    };
};

export default useTimeCountdown;
