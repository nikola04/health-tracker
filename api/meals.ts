import { IMeal } from "@/types/meal";
import { APIResponse, client } from "./client";

interface MealResponse {
    limit: number,
    meals: IMeal[],
    page: number,
    size: number,
    total: number,
    type: string
}

export const searchMealsAPI = async (name: string|null, type: string|null, config?: { limit?: number, page?: number }): Promise<MealResponse|null> => {
    const limit = config?.limit ?? 5;
    const page = config?.page ?? 1;
    try{
        const response = await client.get<APIResponse<MealResponse>>('/meals', {
            params: { name, type, limit, page }
        })
        
        return response.data?.data ?? null;
    }catch(err){
        console.warn('axios err:', err);
        return null;
    }
}
