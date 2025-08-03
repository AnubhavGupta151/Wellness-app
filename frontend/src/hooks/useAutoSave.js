// src/hooks/useAutoSave.js
import { useEffect, useRef } from 'react';
import { debounce } from '../utils/helpers';

export const useAutoSave = ({ value, onSave, delay = 5000, condition = true }) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (condition) {
      const debouncedSave = debounce(() => {
        onSave(value);
      }, delay);

      debouncedSave();

      return () => {
        debouncedSave.cancel();
      };
    }
  }, [value, delay, onSave, condition]);
};

export default useAutoSave;