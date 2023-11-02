import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './AuthContext';
import { ApiContextProvider } from './ApiContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

export const Contexts = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ApiContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
