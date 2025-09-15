import { useCallback, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCalories(){
    const [calories, setCaloriesState] = useState<number|null>(null);

    const getLocal = useCallback(async (): Promise<number|null> => {
        try {
            const stored = await AsyncStorage.getItem('calories');
            if(!stored) return 0;

            const parsed = Number(stored);
            if(isNaN(parsed)) return null;
            return parsed;
        } catch (e) {
            console.error(e);
            return null;
        }
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const local = await getLocal();
            setCaloriesState(local);
        }

        fetch();
    }, [getLocal]);

    const setLocal = useCallback(async (value: number|null): Promise<boolean> => {
        try {
            if(value == null){
                await AsyncStorage.removeItem('calories');
            }else {
                await AsyncStorage.setItem('calories', String(value));
            }

            return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }, []);

    const setCalories = useCallback(async (value: number|null) => {
        const lastValue = calories;
        setCaloriesState(value);

        const success = await setLocal(value);
        if(!success){
            setCaloriesState(lastValue);
        }
    }, [calories, setLocal]);


    return ({ calories, setCalories });
}
