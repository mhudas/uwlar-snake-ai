import { useEffect, useRef } from 'react';

export function useGameLoop(callback, isRunning, tickRate = 100) {
    const savedCallback = useRef(callback);
    const intervalId = useRef(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!isRunning) {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
            return;
        }

        intervalId.current = setInterval(() => {
            savedCallback.current();
        }, tickRate);

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [isRunning, tickRate]);
}
