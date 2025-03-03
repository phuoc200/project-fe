"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  usersService,
  type User,
  type UpdateUserDto,
} from "@/services/users-service";

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateUser = useCallback(
    async (userData: Omit<UpdateUserDto, "userId">) => {
      if (!editingUser) {
        toast.error("No user selected for editing");
        return;
      }
      try {
        await usersService.updateUser(editingUser.userId, userData);
        toast.success("User updated successfully");
        fetchUsers();
        setIsDialogOpen(false);
        setEditingUser(null);
      } catch (error) {
        toast.error("Failed to update user");
      }
    },
    [editingUser, fetchUsers]
  );

  return {
    users,
    loading,
    editingUser,
    setEditingUser,
    isDialogOpen,
    setIsDialogOpen,
    fetchUsers,
    handleUpdateUser,
  };
};
