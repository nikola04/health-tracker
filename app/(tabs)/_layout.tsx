import { Tabs } from 'expo-router';
import { House, Ruler, Settings, Utensils } from 'lucide-react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useTheme } from '@/hooks/use-theme-color';

export default function TabLayout() {
    const theme = useTheme();
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: theme.tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarLabelStyle: { fontWeight: 600 },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <House size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="record"
                options={{
                    title: 'Record',
                    tabBarIcon: ({ color }) => <Ruler size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="diet"
                options={{
                    title: 'Diet',
                    tabBarIcon: ({ color }) => <Utensils size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
