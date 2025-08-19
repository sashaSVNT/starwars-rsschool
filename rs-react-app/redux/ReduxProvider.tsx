'use client';

import { ThemeProvider } from '@/context/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
