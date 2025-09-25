export interface IMeal{
    id: string;
    name: {
        en?: string,
        sr?: string
    };
    description?: {
        en?: string,
        sr?: string
    };
    type: string;
    nutrients: {
        calories: number;
        fat?: number;
        carbs?: number;
        proteins?: number;
    }
}
