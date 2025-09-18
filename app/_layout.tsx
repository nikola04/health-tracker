import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './globals.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme-color';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme = useTheme();

    const defaultNavigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    const navigationTheme: Theme = {
        ...defaultNavigationTheme,
        colors: {
            ...defaultNavigationTheme.colors,
            primary: theme.primaryAlt,
            background: theme.background,
            card: theme.background,
            text: theme.text,
            border: theme.background,
            notification: theme.primary
        }
    };

    const [loaded, error] = useFonts({
        'Poppins': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <ThemeProvider value={navigationTheme}>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.background }}>
                <BottomSheetModalProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false, keyboardHandlingEnabled: true }} />
                    </Stack>
                    <StatusBar style="auto" />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
