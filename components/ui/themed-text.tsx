import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, TextProps } from 'react-native';

export default function ThemedText({ style, children, ...rest }: TextProps){
    const colorScheme = useColorScheme();
    return <Text style={[{ color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text }, style]} {...rest}>
        { children }
    </Text>
}
