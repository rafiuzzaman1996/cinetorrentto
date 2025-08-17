import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class Api {
    constructor(baseUrl = process.env.API_BASE_URL || 'http://localhost:5000') {
        this.baseUrl = baseUrl;
    }

    async request(url, options = {}) {
        try {
            const response = await fetch(this.baseUrl + url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // GET request
    async get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;
        
        return this.request(finalUrl, {
            method: 'GET'
        });
    }

    // POST request
    async post(url, body = {}, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        return this.request(finalUrl, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    // PUT request
    async put(url, body = {}, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        return this.request(finalUrl, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    // PATCH request
    async patch(url, body = {}, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        return this.request(finalUrl, {
            method: 'PATCH',
            body: JSON.stringify(body)
        });
    }

    // DELETE request
    async delete(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        return this.request(finalUrl, {
            method: 'DELETE'
        });
    }
}

// Export the API class
export default Api;

// Usage example
const api = new Api('https://api.example.com');

// GET request example
try {
    const users = await api.get('/users', { page: 1, limit: 10 });
    console.log(users);
} catch (error) {
    console.error(error);
}

// POST request example
try {
    const newUser = await api.post('/users', 
        { name: 'John', email: 'john@example.com' }, // body
        { token: '123' } // query params
    );
    console.log(newUser);
} catch (error) {
    console.error(error);
}