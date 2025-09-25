import { searchMealsAPI } from "@/api/meals";
import { IMeal } from "@/types/meal";
import { useCallback, useEffect, useState } from "react";

export default function useMeals(name: string, type: string){
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        try{
            setLoading(true);

            const response = await searchMealsAPI(name, type);
            
            if(response) 
                setMeals(response.meals);
        } catch(err){
            console.warn(err);
        } finally {
            setLoading(false);
        }
    }, [name, type]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return ({ meals, loading, setMeals });
}
