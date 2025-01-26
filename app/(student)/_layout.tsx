import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='assignment/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
      <Stack.Screen name='attendance' options={{ headerShown: false }} />
      <Stack.Screen name='camera' options={{ headerShown: false }} />
    </Stack>
  );
}
