import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function StudentLayout() {
  const { user } = useAuth();

  if (user === null) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='assignment/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
      <Stack.Screen name='attendance' options={{ headerShown: false }} />
      <Stack.Screen name='camera/[id]' options={{ headerShown: false }} />
    </Stack>
  );
}
