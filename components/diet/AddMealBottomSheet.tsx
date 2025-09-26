import useMeals from "@/hooks/use-meals";
import { useTheme } from "@/hooks/use-theme-color";
import { IMeal } from "@/types/meal";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { PlatformPressable } from "@react-navigation/elements";
import { Beef, CupSoda, RefreshCw, Search, Zap } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import SliderButton from "../ui/slider-button";
import MealItem from "./MealItem";

const mealMap = ['food', 'drink'];

export default function AddMealBottomSheet({ onSearchFocus }: {
    onSearchFocus: () => any;
}){
    const theme = useTheme();

    const defaultMealType = -1;
    const [activeMealType, setActiveMealType] = useState<number>(defaultMealType);

    const [search, onSearchChange] = useState<string>('')
    const mealType: string|null = useMemo(() => activeMealType === -1 ? null : mealMap[activeMealType], [activeMealType]);

    const { meals } = useMeals(search, mealType);

    return <View className='flex-col items-center px-4'>
        <BottomSheetFlatList
            data={meals}
            keyExtractor={(item: IMeal) => item.id}
            renderItem={({ item }: { item: IMeal }) => <MealItem meal={item} />} 
            contentContainerStyle={{ gap: 8 }}
            className="w-full"  
            ListHeaderComponent={<View className='flex-col items-center gap-8 py-4'>
                <View className='flex-col items-center gap-1'>
                    <Text className='text-xl font-semibold' style={{ color: theme.text }}>What have you eaten?</Text>
                    <Text className='opacity-50' style={{ color: theme.text }}>Select meal and quantity</Text>
                </View>
                <SliderButton
                    items={[{ Icon: Beef, title: 'Food' }, { Icon: CupSoda, title: 'Drink' }]}
                    defaultActive={defaultMealType}
                    enableUnselect={true}
                    onChange={setActiveMealType}
                    backgroundColor={theme.backgroundAlt}
                />
                <View className='w-full flex-col gap-2'>
                    <Text className='text-lg font-semibold px-4' style={{ color: theme.text }}>Select Meal</Text>
                    <View className="flex-row gap-2">
                        <SearchBar placeholder='search meals...' value={search} onChangeText={onSearchChange} onFocus={onSearchFocus} />
                        <QuickButton/>
                    </View>
                </View>
            </View>}
            ListFooterComponent={<View className='flex-col items-center gap-8 py-4'>
                <ShowMoreButton />
            </View>}
        />
    </View>
}

function SearchBar({ style, ...rest }: TextInputProps){
    const theme = useTheme();
    return <View className='flex-row flex-grow items-center gap-4 p-4 px-5 rounded-3xl' style={{ backgroundColor: theme.backgroundAlt }}>
        <Search color={theme.text} size={21} />
        <TextInput style={[{ flexGrow: 1, color: theme.text, fontSize: 16 }, style]} {...rest} />
    </View>
}

function QuickButton({ onPress }: { 
    onPress?: () => any
}) {
    const theme = useTheme();
    return <PlatformPressable className="flex items-center justify-center p-4 rounded-3xl aspect-square" style={{ backgroundColor: theme.backgroundAlt }} onPress={onPress}>
        <Zap color={theme.primary} size={16} />
    </PlatformPressable>
}

function ShowMoreButton(){
    const color = 'gray';
    return <PlatformPressable className='h-16 flex-row w-full p-4 rounded-3xl gap-2 items-center justify-center border border-dashed' style={{ borderColor: color }}>
        <RefreshCw size={16} color={color} />
        <Text style={{ color }} className="font-medium">Load more</Text>
    </PlatformPressable>
}
