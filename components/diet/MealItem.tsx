import { useTheme } from "@/hooks/use-theme-color";
import { IMeal } from "@/types/meal";
import { PlatformPressable } from "@react-navigation/elements";
import { Martini, Utensils } from "lucide-react-native";
import { Text, View } from "react-native";

export default function MealItem({ meal }: {
    meal: IMeal
}){
    const theme = useTheme();
    const Icon = meal.type === 'drink' ? Martini : Utensils;
    return <PlatformPressable className='flex-row w-full p-4 rounded-3xl gap-4 items-center justify-start' style={{ backgroundColor: theme.backgroundAlt }}>
        <Icon color={theme.primary} size={24}/>
        <View className="flex-col gap-1">
            <Text className='' style={{ color: theme.text }}>{ meal.name.en }</Text>
            <Text className='' style={{ color: theme.text, opacity: .6 }}>{ meal.description?.en }</Text>
        </View>
    </PlatformPressable>
}
