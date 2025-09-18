import PageTitle from '@/components/ui/page-title';
import BlurredScrollView from '@/components/ui/scroll-view';

export default function SettingsScreen() {
    return <BlurredScrollView>
        <PageTitle title='Settings' description='Setup application theme, units and sync'/>
    </BlurredScrollView>
}
