import { PrimaryButton } from '@/components/ui/button';
import PageTitle from '@/components/ui/page-title';
import BlurredScrollView from '@/components/ui/scroll-view';
import SliderButton from '@/components/ui/slider-button';
import ThemedText from '@/components/ui/themed-text';
import { ThemedBlockView } from '@/components/ui/themed-view';
import { useTheme } from '@/hooks/use-theme-color';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { PlatformPressable } from '@react-navigation/elements';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { Beef, CupSoda, LucideIcon, NotebookText, Pin, Plus, Search, Soup } from 'lucide-react-native';
import { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Keyboard, Text, TextInput, TextInputProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DietScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const handleAddMealPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
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
            onAnimate={Keyboard.dismiss}
            index={1}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'
            backgroundStyle={{
                backgroundColor: theme.backgroundAlt,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5, // Android
            }}
            handleIndicatorStyle={{ backgroundColor: theme.text }}
          >
            <AddMealModal />
        </BottomSheetModal>
    </BlurredScrollView>
}

function AddMealModal(){
    const theme = useTheme();

    const defaultMealType = 0;
    const [activeMealType, setActiveMealType] = useState<number>(defaultMealType);
    const mealType: string = useMemo(() => activeMealType === 0 ? 'food' : 'drink', [activeMealType]);

    return <BottomSheetScrollView keyboardShouldPersistTaps="handled" keyboardAvoidingBehavior="padding" contentContainerClassName='flex-col items-center gap-8 p-4'>
        <View className='flex-col items-center gap-1'>
            <Text className='text-xl font-semibold' style={{ color: theme.text }}>What have you eaten?</Text>
            <Text className='opacity-50' style={{ color: theme.text }}>Select meal and quantity</Text>
        </View>
        <SliderButton 
            items={[{ Icon: Beef, title: 'Food' }, { Icon: CupSoda, title: 'Drink' }]}
            defaultActive={defaultMealType}
            onChange={setActiveMealType}
            backgroundColor={theme.background}
        />
        <View className='w-full flex-col gap-2'>
            <Text className='text-lg font-semibold px-4' style={{ color: theme.text }}>Select Meal</Text>
            <SearchBar placeholder='search meals...' />
        </View>
    </BottomSheetScrollView>
}

function SearchBar({ style, ...rest }: TextInputProps){
    const theme = useTheme();
    return <View className='w-full flex-row items-center gap-4 p-4 rounded-3xl' style={{ backgroundColor: theme.background }}>
        <Search color={theme.text} />
        <TextInput style={[{ flexGrow: 1, color: theme.text, fontSize: 17 }, style]} {...rest} />
    </View>
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
