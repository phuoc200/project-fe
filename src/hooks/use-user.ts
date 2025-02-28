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
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

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

  const handleDeleteUser = useCallback(async () => {
    if (!deleteUserId) {
      toast.error("No user ID selected for deletion");
      return;
    }
    if (
      !confirm(`Are you sure you want to delete user with ID ${deleteUserId}?`)
    )
      return;

    try {
      await usersService.deleteUser(deleteUserId);
      toast.success(`User with ID ${deleteUserId} deleted successfully`);
      fetchUsers();
      setDeleteUserId(null);
    } catch (error) {
      toast.error(`Failed to delete user with ID ${deleteUserId}`);
    }
  }, [deleteUserId, fetchUsers]);

  return {
    users,
    loading,
    editingUser,
    setEditingUser,
    isDialogOpen,
    setIsDialogOpen,
    deleteUserId,
    setDeleteUserId,
    fetchUsers,
    handleUpdateUser,
    handleDeleteUser,
  };
};
