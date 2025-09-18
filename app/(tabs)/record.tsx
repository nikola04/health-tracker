
import { PrimaryButton } from '@/components/ui/button';
import PageTitle from '@/components/ui/page-title';
import BlurredScrollView from '@/components/ui/scroll-view';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { Weight } from 'lucide-react-native';

export default function RecordScreen() {
    return <BlurredScrollView>
        <PageTitle title='Record Measurments' description='Record your measured weight and size'/>
        <PrimaryButton title='Record weight' icon={Weight} haptics={ImpactFeedbackStyle.Light} />
    </BlurredScrollView>
}
