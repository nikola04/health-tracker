import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab({ onPressIn, style, ...rest }: BottomTabBarButtonProps) {
    return <PlatformPressable
        style={[{ paddingTop: 10, gap: 4 }, style]}
        onPressIn={(ev) => {
            if (process.env.EXPO_OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            onPressIn?.(ev);
        }}
        {...rest}
    />;
}
