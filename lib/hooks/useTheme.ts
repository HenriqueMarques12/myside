'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { toggleTheme, setTheme, initializeTheme } from '@/lib/store/features/themeSlice';
import { ThemeMode } from '@/lib/types/Theme';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const set = (mode: ThemeMode) => {
    dispatch(setTheme(mode));
  };

  return {
    mode: themeMode,
    toggle,
    set,
  };
};