import {useEffect, useRef} from 'react';

type ClearTimerFn = (id: number | undefined) => void;
type RunTimerFn = (handler: () => void, timeout: number) => number;

const creteUseTimer =
  (clear: ClearTimerFn, runTimer: RunTimerFn) =>
  (callback: () => void, delay: number): void => {
    const timerRef = useRef<number>();

    useEffect(() => {
      const stop = () => clear(timerRef.current);

      stop();

      timerRef.current = runTimer(callback, delay);

      return stop;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay]);
  };

// eslint-disable-next-line prettier/prettier
export const useInterval = creteUseTimer(
  clearInterval,
  setInterval,
);
// eslint-disable-next-line prettier/prettier
export const useTimeout = creteUseTimer(
  clearTimeout,
  setTimeout,
);
