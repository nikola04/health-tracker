
import ThemedText from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import useCalories from '@/hooks/use-calories';

export default function DailyScreen() {
    const { calories } = useCalories();
    
    if(calories === null){
        return <ThemedView>
            <ThemedText>Loading</ThemedText>
        </ThemedView>
    }

    return <ThemedView className='flex-1 items-center justify-center'>
        {/* <CaloriesView current={calories} goal={2100} /> */}
    </ThemedView>
}
