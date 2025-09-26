import { useTheme } from "@/hooks/use-theme-color";
import { PlatformPressable } from "@react-navigation/elements";
import { LucideIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SliderButton({ items, defaultActive, enableUnselect, onChange, backgroundColor, color }: {
    items: {
        title?: string,
        Icon?: LucideIcon
    }[];
    defaultActive?: number;
    enableUnselect?: boolean;
    onChange?: (key: number) => any;
    backgroundColor?: string;
    color?: string;
}){
    const theme = useTheme();
    const [activeKey, setActive] = useState<number|null>(null);

    const unselectEnabled = enableUnselect ?? false;
    const bgColor = backgroundColor ?? theme.backgroundAlt;
    const _color = color ?? theme.text;

    const handlePress = useCallback((key: number) => {
        if(unselectEnabled && key === activeKey) key = -1;
        if(key === activeKey) return;
        setActive(key);
        onChange?.(key);
    }, [activeKey, onChange, unselectEnabled])

    useEffect(() => {
        if(defaultActive != null) setActive(defaultActive);
    }, [defaultActive]);

    return <View className="flex-row p-2 rounded-3xl" style={{ backgroundColor: bgColor }}>
        { items.map((item, key) => {
            const isActive = activeKey === key;
            const color = isActive ? bgColor : _color;
            return <PlatformPressable onPress={() => handlePress(key)} pressOpacity={.7} key={key}>
                <View className="px-4 py-3 flex-row items-center gap-2 rounded-2xl" style={{ backgroundColor: isActive ? theme.primary : 'transparent' }}>
                    { item.Icon && <item.Icon color={color} size={18} /> }
                    { item.title && <Text style={{ color }} className="font-medium">{ item.title }</Text>}
                </View>
            </PlatformPressable>
        })}
    </View>
}
