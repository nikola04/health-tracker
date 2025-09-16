import { useTheme } from '@/hooks/use-theme-color';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollViewProps, StyleSheet, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BlurredScrollView({ contentContainerClassName, contentContainerStyle, gradient = false, children, ...rest }: {
    gradient?: boolean
} & ScrollViewProps){
    const scrollY = useSharedValue(0);
    const insets = useSafeAreaInsets();

    const blurStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [40, 80], [0, 1], Extrapolation.CLAMP)
    }));

    const gradientHeight = 260;
    const gradientStyle = useAnimatedStyle(() => ({
        top: interpolate(scrollY.value, [0, 600], [0, -gradientHeight], Extrapolation.CLAMP),
    }));

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => scrollY.value = e.contentOffset.y
    })

    return <View className='flex-1'>
        <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top + 20, zIndex: 100 }, blurStyle]}>
            <MaskedView
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, height: insets.top + 30 }}
                maskElement={
                    <LinearGradient
                        colors={['black', 'black', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0, 0.5, 1]}
                        style={{ flex: 1 }}
                    />
                }
            >
                <BlurView
                    intensity={50}
                    tint={'default'}
                    style={{ flex: 1 }}
                />
            </MaskedView>
        </Animated.View>
        { gradient && <Animated.View style={[{ position: 'absolute', left: 0, right: 0, height: gradientHeight }, gradientStyle]}>
            <TopGradient />
        </Animated.View> }
        <Animated.ScrollView
            scrollEventThrottle={20}
            onScroll={scrollHandler}
            contentContainerClassName={`relative px-4 pb-6 gap-6 ${contentContainerClassName}`}
            contentContainerStyle={[{ alignItems: 'center', paddingTop: insets.top }, contentContainerStyle]}
            {...rest}
        >
            { children }
        </Animated.ScrollView>
    </View>
}

function TopGradient(){
    const theme = useTheme();
    
    return <>
        <LinearGradient
            colors={['#2A7B9B', '#57C785', '#EDDD53']}
            locations={[0, 0.35, 0.7]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ ...StyleSheet.absoluteFillObject }}
        />
        <LinearGradient
            colors={['transparent', theme.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ ...StyleSheet.absoluteFillObject }}
        />
    </>
}
