"use client";

import { useState, useEffect, useCallback } from "react";
import { type User, usersService } from "@/services/users-service";
import { toast } from "sonner";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);

      // Set the first user as current user if available
      if (data.length > 0 && !currentUser) {
        setCurrentUser(data[0]);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    currentUser,
    setCurrentUser,
    loading,
    fetchUsers,
  };
};
