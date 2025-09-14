import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { View, ViewProps } from "react-native";

export default function ThemedView({ className, style, children, ...rest}: ViewProps){
    const colorScheme = useColorScheme();
    return <View className={`flex-1 ${className}`} style={[{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background }, style]} {...rest}>
        { children }
    </View>
}
