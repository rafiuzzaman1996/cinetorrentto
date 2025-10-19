'use client';
import {User} from '@/types/admin/User';
import { Loader2, LogOut } from 'lucide-react';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

export default function UserInfo() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const handleLogout = React.useCallback(async () => {
        localStorage.removeItem('user');
        try {
            await fetch('/api/logout', {method: 'POST'});
        } catch (error) {
            console.error('Logout failed', error);
        }
        router.push('/login');
    }, [router]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser?.full_name) {
                    setUser(parsedUser);
                } else {
                    handleLogout();
                }
            } catch (e) {
                console.error('Invalid user:', e);
                handleLogout();
            }
        } else {
            handleLogout();
        }
    }, [handleLogout]);

    if (!user) {
        return <span><Loader2 className="animate-spin" /></span>; // optional fallback
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="mr-2">{user?.full_name}</span>
            <button className="flex items-center cursor-pointer" onClick={handleLogout}>
                {/* Logout icon */}
                <LogOut size={16} />
            </button>
        </div>
    );
}
