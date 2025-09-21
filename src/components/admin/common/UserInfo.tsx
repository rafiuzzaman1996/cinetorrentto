'use client'
import { User } from '@/types/admin/User';
import React, { useEffect, useState } from 'react';

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.full_name) {
          setUser(parsedUser);
        } else {
          handleLogout();
        }
      } catch (e) {
        console.error("Invalid user JSON:", e);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed", error);
    }
    window.location.href = "/login";
  };

  if (!user) {
    return <span>Loading...</span>; // optional fallback
  }

  return (
    <div>
      <span>{user?.full_name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
