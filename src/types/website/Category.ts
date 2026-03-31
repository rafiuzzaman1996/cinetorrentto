import { Content } from "./Content";

export interface Category {
    id: number;
    title: string;
    slug: string;
    contents: Content[];
}
