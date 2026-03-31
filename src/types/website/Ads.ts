export interface Ads {
    id?: number;
    title: string;
    placement: string;
    code?: string;
    url: string;
    format?: string;
    size?: string;
    is_active: boolean;
    sequence: number;
    created_at?: string;
    updated_at?: string;
}
