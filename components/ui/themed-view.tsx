import { useTheme } from "@/hooks/use-theme-color";
import { View, ViewProps } from "react-native";

export function ThemedView({  style, children, ...rest}: ViewProps){
    const theme = useTheme();
    return <View style={[{ backgroundColor: theme.background }, style]} {...rest}>
        { children }
    </View>
}

export function ThemedBlockView({ style, children, ...rest}: ViewProps){
    const theme = useTheme();
    return <View style={[{ backgroundColor: theme.backgroundAlt }, style]} {...rest}>
        { children }
    </View>
}
