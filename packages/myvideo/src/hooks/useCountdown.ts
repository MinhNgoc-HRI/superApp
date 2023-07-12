// TODO: example and test
import {useInterval} from './useInterval';
import {useCallback} from 'react';
import {useBoolean} from './useBoolean';
import {useCounter} from './useCounter';

interface UseCountdownType {
  seconds: number;
  interval: number;
  isIncrement?: boolean;
}
interface CountdownHelpers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}
interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

export function useCountdown(
  countdownOption: UseCountdownType,
): [number, CountdownHelpers];

export function useCountdown(
  countdownOption: CountdownOption,
): [number, CountdownControllers];

export function useCountdown(
  countdownOption: UseCountdownType | CountdownOption,
): [number, CountdownHelpers | CountdownControllers] {
  let isDeprecated = false;

  let countStart,
    intervalMs,
    isIncrement: boolean | undefined,
    countStop: number | undefined;

  if ('seconds' in countdownOption) {
    isDeprecated = true;
    countStart = countdownOption.seconds;
    intervalMs = countdownOption.interval;
    isIncrement = countdownOption.isIncrement;
  } else {
    ({countStart, intervalMs, isIncrement, countStop} = countdownOption);
  }

  intervalMs = intervalMs ?? 1000;
  isIncrement = isIncrement ?? false;
  countStop = countStop ?? 0;

  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart);

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return isDeprecated
    ? [
        count,
        {
          start: startCountdown,
          stop: stopCountdown,
          reset: resetCountdown,
        } as CountdownHelpers,
      ]
    : [
        count,
        {
          startCountdown,
          stopCountdown,
          resetCountdown,
        } as CountdownControllers,
      ];
}
