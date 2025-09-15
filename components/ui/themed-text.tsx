import { useTheme } from '@/hooks/use-theme-color';
import { Text, TextProps } from 'react-native';

export default function ThemedText({ style, children, ...rest }: TextProps){
    const theme = useTheme();
    return <Text style={[{ color: theme.text }, style]} {...rest}>
        { children }
    </Text>
}
