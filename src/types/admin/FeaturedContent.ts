export interface FeaturedContent {
    id?: number;
    content_id: number;
    sequence: number;
    content?: {
        id: number;
        title: string;
        description?: string;
        // Add other relevant fields as needed
    };
}
