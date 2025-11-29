import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="screens/AddEditBookScreen" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/AddEditAuthorScreen" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/AuthorDetailScreen" options={{ headerShown: true, title: "" }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
