import { useTheme } from '@/hooks/use-theme-color';
import Haptics, { impactAsync } from 'expo-haptics';
import { LucideIcon } from 'lucide-react-native';
import { GestureResponderEvent, Pressable, Text, ViewProps } from 'react-native';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ButtonProps extends ViewProps {
    title: string;
    icon?: null|LucideIcon;
    haptics?: null|Haptics.ImpactFeedbackStyle;
    onPressIn?: (e: GestureResponderEvent) => void|null;
    onPressOut?: (e: GestureResponderEvent) => void|null;
    onPress?: (e: GestureResponderEvent) => void|null;
};

export function PrimaryButton({ color, backgroundColor, onPressColor, ...rest }: {
    color?: string;
    backgroundColor?: string;
    onPressColor?: string;
} & ButtonProps){
    const theme = useTheme();
    const buttonColor = color ?? theme.background;
    const buttonBackgroundColor = backgroundColor ?? theme.primary;
    const buttonPressColor = onPressColor ?? theme.primaryAlt;


    return <CustomButton color={buttonColor} backgroundColor={buttonBackgroundColor} onPressColor={buttonPressColor} {...rest}/>
}

export function CustomButton({ title, color, backgroundColor, onPressColor, icon = null, className, haptics, onPressIn, onPressOut, onPress, ...rest }: {
    color: string;
    backgroundColor: string;
    onPressColor?: string;
} & ButtonProps){
    if(!onPressColor) onPressColor = color;
    const Icon = icon;

    const pressed = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(pressed.value, [0, 1], [backgroundColor, onPressColor])
    }));

    const handlePressIn = (e: GestureResponderEvent) => {
        pressed.value = withTiming(1, { duration: 100, easing: Easing.ease });
        onPressIn?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
        pressed.value = withTiming(0, { duration: 75, easing: Easing.ease });
        onPressOut?.(e);
    };

    const handlePress = (e: GestureResponderEvent) => {
        if(haptics) impactAsync(haptics);
        onPress?.(e);
    }

    return <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress} className='w-full rounded-3xl'>
        <Animated.View style={[animatedStyle]} className={`w-full h-14 rounded-3xl flex-row items-center justify-center gap-2 ${className}`} {...rest}>
            { Icon && <Icon color={color} /> }
            <Text className='text-lg font-semibold' style={{ color }}>{ title }</Text>
        </Animated.View>
    </Pressable>
}
