import AddMealBottomSheet from '@/components/diet/AddMealBottomSheet';
import { PrimaryButton } from '@/components/ui/button';
import PageTitle from '@/components/ui/page-title';
import BlurredScrollView from '@/components/ui/scroll-view';
import ThemedText from '@/components/ui/themed-text';
import { ThemedBlockView } from '@/components/ui/themed-view';
import { useTheme } from '@/hooks/use-theme-color';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { PlatformPressable } from '@react-navigation/elements';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { LucideIcon, NotebookText, Pin, Plus, Soup } from 'lucide-react-native';
import { ReactElement, useCallback, useMemo, useRef } from 'react';
import { Dimensions, Keyboard, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DietScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const handleAddMealPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleModalAnimate = useCallback((fromIndex: number, toIndex: number) => {
        if(toIndex >= fromIndex) return;
        Keyboard.dismiss(); // only on collapse
    }, [])

    const handleSearchFocus = useCallback(() => {
        bottomSheetModalRef.current?.expand();
    }, []);

    const snapPoints = useMemo(() => ['55%', Dimensions.get('window').height - insets.top], [insets.top]);

    return <BlurredScrollView>
        <PageTitle title='Food & Diet' description='Manage your daily food intake and nutrition'/>
        <View className='w-full flex-col gap-16'>
            <View className='w-full flex-col gap-6'>
                <TodaySection />
                <PrimaryButton title='Add a meal' icon={Soup} haptics={ImpactFeedbackStyle.Light} onPress={handleAddMealPress} />
            </View>
            <FoodSection />
        </View>
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onAnimate={handleModalAnimate}
            index={0}
            keyboardBehavior='interactive'
            enableDynamicSizing={false}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                />
            )}
            keyboardBlurBehavior='restore'
            backgroundStyle={{
                backgroundColor: theme.background,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5, // Android
            }}
            handleIndicatorStyle={{ backgroundColor: theme.text }}
          >
            <AddMealBottomSheet onSearchFocus={handleSearchFocus} />
        </BottomSheetModal>
    </BlurredScrollView>
}

function FoodSection(){
    const theme = useTheme();
    return <SectionListView
        title='Saved meals'
        Icon={Pin}
        HeaderCorner={<PlatformPressable className=''><Plus color={theme.text} /></PlatformPressable>}
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
