import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

export const Contexts = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>{children}</UserContextProvider>
    </QueryClientProvider>
  );
};
