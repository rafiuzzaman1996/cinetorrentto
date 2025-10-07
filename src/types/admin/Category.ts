export interface Category {
    id?: number;
    title: string;
    description: string;
    slug: string;
    image_url: string;
    banner_image_url: string;
    icon_url: string;
    is_active: boolean;
    is_featured: boolean;
    is_popular: boolean;
    is_trending: boolean;
    tags: string;
    metadata: string;
    external_id: string;
    external_source: string;
    external_url: string;
    sequence: number;
}
