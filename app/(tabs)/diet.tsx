import { PrimaryButton } from '@/components/ui/button';
import PageTitle from '@/components/ui/page-title';
import BlurredScrollView from '@/components/ui/scroll-view';
import ThemedText from '@/components/ui/themed-text';
import { ThemedBlockView } from '@/components/ui/themed-view';
import { useTheme } from '@/hooks/use-theme-color';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { LucideIcon, NotebookText, Pin, Soup } from 'lucide-react-native';
import { ReactElement } from 'react';
import { View } from 'react-native';

export default function DietScreen() {
    return <BlurredScrollView>
        <PageTitle title='Food & Diet' description='Manage your daily food intake and nutrition'/>
        <View className='w-full flex-col gap-16'>
            <View className='w-full flex-col gap-6'>
                <TodaySection />
                <PrimaryButton title='Add Meal' icon={Soup} haptics={ImpactFeedbackStyle.Light} />
            </View>
            <FoodSection />
        </View>
    </BlurredScrollView>
}

function FoodSection(){
    // const theme = useTheme();
    return <SectionListView
        title='My meals'
        Icon={Pin}
        // Footer={<Button title='show more' color={theme.primary}/>}
    />
}

function TodaySection(){
    const meals = 0;
    const totalCalories = 0;

    return <SectionListView
        title='Eaten Today'
        Icon={NotebookText}
        HeaderCorner={<ThemedText className='opacity-80'>{ meals } meals</ThemedText>}
        Footer={<View className='flex-row items-center'>
            <ThemedText style={{ opacity: 0.8 }}>In total </ThemedText>
            <ThemedText>{ totalCalories } kcal</ThemedText>
            <ThemedText style={{ opacity: 0.8 }}> today.</ThemedText>
        </View>}
    />
}

function SectionListView({ title, Icon, List, HeaderCorner, Footer }: {
    title: string;
    Icon: LucideIcon
    HeaderCorner?: ReactElement;
    List?: ReactElement;
    Footer?: ReactElement;
}){
    const theme = useTheme();
    return <ThemedBlockView className='w-full p-5 gap-4 rounded-3xl'>
        <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center justify-start gap-3'>
                <Icon size={20} color={theme.text}/>
                <ThemedText className='text-xl font-semibold'>{ title }</ThemedText>
            </View>
            { HeaderCorner }
        </View>
        <View>
            { List }
        </View>
        { Footer}
    </ThemedBlockView>
}
