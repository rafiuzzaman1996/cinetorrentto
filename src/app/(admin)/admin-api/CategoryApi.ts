'use server';

export const getCategories = async (searchParams: {page: number; limit: number; filter?: unknown, search: string}) => {
    try {
        const apiUrl = process.env.API_URL;
        // 🔹 Convert filter into URLSearchParams, auto prepend $ilike
        let filterParams = '';
        if (searchParams.filter) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(searchParams.filter)) {
                const finalValue = value?.startsWith('$') ? value : `$ilike:${value}`;
                params.append(`filter.${key}`, finalValue);
            }
            filterParams = params.toString();
        }

        const url = `${apiUrl}/category?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;


        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch contents: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch contents:', error);
        return [];
    }
};
export const getCategory = async (id: number) => {
    try {
        const apiUrl = process.env.API_URL;
        const res = await fetch(`${apiUrl}/category/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch content: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return null;
    }
};

// getAllCategories

export const getAllCategories = async () => {
    try {
        const apiUrl = process.env.API_URL;
        const res = await fetch(`${apiUrl}/category`);

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
};