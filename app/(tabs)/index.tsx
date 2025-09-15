import ProgressLine from '@/components/ui/progress-line';
import ThemedText from '@/components/ui/themed-text';
import { ThemedBlockView, ThemedView } from '@/components/ui/themed-view';
import { customColors } from '@/constants/theme';
import useCalories from '@/hooks/use-calories';
import { useTheme } from '@/hooks/use-theme-color';
import { PlatformPressable } from '@react-navigation/elements';
import { ChartPie, ChevronRight, LucideIcon, TrendingDown, TrendingUp, Weight, Zap } from 'lucide-react-native';
import { ScrollView, Text, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DailyScreen() {
    const theme = useTheme();
    const { calories } = useCalories();
    
    if(calories === null){
        return <ThemedView>
            <ThemedText>Loading</ThemedText>
        </ThemedView>
    }

    return <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} >
        <ScrollView contentContainerClassName='flex-1 px-4 gap-6' contentContainerStyle={{ alignItems: 'center' }}>
            <ThemedView className='px-4 pt-8 pb-6 gap-2 items-center'>
                <ThemedText className='text-3xl' style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Diet Tracker</ThemedText>
                <ThemedText>Track your meals and calories intake</ThemedText>
            </ThemedView>
            <SectionView title='Daily calories' titleColor='black' icon={Zap} style={{ backgroundColor: theme.primaryAlt }} containerProps={{ className: 'flex-row justify-around py-2' }}>
                <View>
                    <View className='flex-row items-baseline gap-1'>
                        <Text className='text-3xl'>1740</Text>
                        <Text>kcal</Text>
                    </View>
                    <Text>today</Text>
                </View>
                <View>
                    <View className='flex-row items-baseline gap-1'>
                        <Text className='text-3xl'>1913</Text>
                        <Text>kcal</Text>
                    </View>
                    <Text>average</Text>
                </View>
            </SectionView>
            <NutrientsSection />
            <WeightSection />
        </ScrollView>
    </SafeAreaView>
}

function SectionView({ children, title, icon, titleColor, className, containerProps, onPress, ...rest }: {
    title: string,
    icon: LucideIcon,
    titleColor?: string,
    containerProps?: ViewProps
    onPress?: () => any;
} & ViewProps){
    const theme = useTheme();
    if(!titleColor) titleColor = theme.text;
    const Icon = icon;
    return <PlatformPressable className='w-full' onPress={onPress}>
        <ThemedBlockView className={`p-5 gap-4 rounded-3xl ${className}`} {...rest}>
            <View className='flex-row items-center'>
                <View className='flex-row items-center justify-start gap-3'>
                    <Icon size={20} color={titleColor}/>
                    <Text className='text-xl font-semibold' style={{ color: titleColor }}>{ title }</Text>
                </View>
                <View className='ml-auto'>
                    <ChevronRight size={20} color={titleColor}/>
                </View>
            </View>
            <View {...containerProps}>
                { children }
            </View>
        </ThemedBlockView>
    </PlatformPressable>
}

function NutrientsSection(){
    const theme = useTheme();

    const carbsColor = '#FFC067', fatColor = '#C9A0DC', proteinColor = theme.primaryAlt;

    return <SectionView title='Daily nutrients' icon={ChartPie} containerProps={{ className: 'flex-col gap-2 py-2' }}>
        <View className='flex-col gap-2'>
            <View className='flex-row items-center justify-between'>
                <ThemedText className='opacity-80'>Carbs</ThemedText>
                <ThemedText>100/190 g</ThemedText>
            </View>
            <View className='flex-row gap-5 items-center'>
                <ThemedText className='text-lg' >55%</ThemedText>
                <ProgressLine className='flex-1' progress={55} color={carbsColor} />
            </View>
        </View>
        <View className='flex-col gap-2'>
            <View className='flex-row items-center justify-between'>
                <ThemedText className='opacity-80'>Fat</ThemedText>
                <ThemedText>13.5/52 g</ThemedText>
            </View>
            <View className='flex-row gap-5 items-center'>
                <ThemedText className='text-lg'>25%</ThemedText>
                <ProgressLine className='flex-1' progress={25} color={fatColor} />
            </View>
        </View>
        <View className='flex-col gap-2'>
            <View className='flex-row items-center justify-between'>
                <ThemedText className='opacity-80'>Protein</ThemedText>
                <ThemedText>25/122 g</ThemedText>
            </View>
            <View className='flex-row gap-5 items-center'>
                <ThemedText className='text-lg'>20%</ThemedText>
                <ProgressLine className='flex-1' progress={20} color={proteinColor} />
            </View>
        </View>
    </SectionView>
}

function WeightSection(){
    const gainedWeight: boolean = false;

    const gainColor = 'red', lossColor = customColors.primary;

    return <SectionView title='Weight' icon={Weight} containerProps={{ className: 'flex-row justify-around gap-2 py-2' }}>
        <View>
            <View className='flex-row items-baseline gap-1'>
                <ThemedText className='text-3xl'>88</ThemedText>
                <ThemedText>kg</ThemedText>
            </View>
        </View>
        <View  className='flex-row gap-2'>
            <View>
                { gainedWeight ? 
                    <TrendingUp color={gainColor} />
                    :
                    <TrendingDown color={lossColor} />
                }
            </View>
            <View className='flex-row items-baseline gap-1'>
                <ThemedText className='text-3xl'>3</ThemedText>
                <ThemedText>kg</ThemedText>
            </View>
        </View>
    </SectionView>
}
