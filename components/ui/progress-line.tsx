import { useTheme } from "@/hooks/use-theme-color";
import { View, ViewProps } from "react-native";

export default function ProgressLine({ progress, backgroundColor, color, className, style, ...rest }: {
    progress: number;
    backgroundColor?: string;
    color: string;
} & ViewProps){
    const theme = useTheme();
    return <View className={`h-4 rounded-xl ${className}`} style={[{ backgroundColor: backgroundColor ?? theme.background }, style]}>
        <View className="rounded-xl h-full" style={{ width: `${progress}%`, backgroundColor: color }}/>
    </View>
}
