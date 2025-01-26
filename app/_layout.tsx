import Providers from '@/components/Provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-BoldItalic': require('../assets/fonts/OpenSans-BoldItalic.ttf'),
    'OpenSans-ExtraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('../assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('../assets/fonts/OpenSans-LightItalic.ttf'),
    'OpenSans-Medium': require('../assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-MediumItalic': require('../assets/fonts/OpenSans-MediumItalic.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <Stack
        initialRouteName='login'
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(student)' options={{ headerShown: false }} />
        <Stack.Screen name='(teacher)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      <StatusBar style='dark' />
    </Providers>
  );
}
