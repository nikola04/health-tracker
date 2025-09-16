import { useTheme } from "@/hooks/use-theme-color";
import { Text, View, ViewProps } from "react-native";

export default function PageTitle({ title, description, color, className, ...rest }: {
    title: string;
    description: string;
    color?: string;
} & ViewProps){
    const theme = useTheme();
    if(!color) color = theme.text;

    return <View className={`px-4 pt-10 pb-6 gap-1.5 items-center ${className}`} {...rest}>
        <Text className='text-3xl' style={{ fontFamily: 'Poppins', fontWeight: 600, color }}>{ title }</Text>
        <Text style={{ opacity: 0.6, color }}>{ description }</Text>
    </View>
}
