import PageTitle from '@/components/ui/page-title';
import ProgressLine from '@/components/ui/progress-line';
import BlurredScrollView from '@/components/ui/scroll-view';
import ThemedText from '@/components/ui/themed-text';
import { ThemedBlockView, ThemedView } from '@/components/ui/themed-view';
import { customColors } from '@/constants/theme';
import useCalories from '@/hooks/use-calories';
import { useTheme } from '@/hooks/use-theme-color';
import { PlatformPressable } from '@react-navigation/elements';
import { ChartPie, ChevronRight, LucideIcon, TrendingDown, TrendingUp, Weight, Zap } from 'lucide-react-native';
import { Text, View, ViewProps } from 'react-native';

export default function DailyScreen() {
    const { calories } = useCalories();
    
    if(calories === null){
        return <ThemedView>
            <ThemedText>Loading</ThemedText>
        </ThemedView>
    }

    return <BlurredScrollView gradient={true}>
        <PageTitle title='Diet Tracker' description='Track your meals and calories intake' color='white' />
        <SectionView title='Daily calories' icon={Zap}  containerProps={{ className: 'flex-row justify-around py-2' }}>
            <View>
                <View className='flex-row items-baseline gap-1'>
                    <ThemedText className='text-3xl'>1740</ThemedText>
                    <ThemedText>kcal</ThemedText>
                </View>
                <ThemedText>today</ThemedText>
            </View>
            <View>
                <View className='flex-row items-baseline gap-1'>
                    <ThemedText className='text-3xl'>1913</ThemedText>
                    <ThemedText>kcal</ThemedText>
                </View>
                <ThemedText>average</ThemedText>
            </View>
        </SectionView>
        <NutrientsSection />
        <WeightSection />
    </BlurredScrollView>
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
