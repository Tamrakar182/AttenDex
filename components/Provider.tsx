import { AuthProvider } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { Toaster } from 'sonner-native';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
