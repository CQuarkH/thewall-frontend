import type { Register } from "@models/formSchemas";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api"

export const login = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error("Error logging in: " + error.message);
    }
}


export const authRegister = async (register: Register): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(register)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.text();
            throw new Error(data);
        }
    } catch (error: any) {
        throw new Error("Error registering: " + error.message);
    }
}

export const logout = async (): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: 'include'
        });
        const data = response;
        return data;
    } catch (error: any) {
        throw new Error("Error logging out: " + error.message);
    }
}