import { AuthProvider } from '@/context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'sonner-native';
import { queryClient } from '@/utils/api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
