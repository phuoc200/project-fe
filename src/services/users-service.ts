import { fetchClient } from "@/lib/fetch-client";

export interface User {
  userId: number;
  username: string;
  email: string;
  roleId: number;
  // fullName?: string;
  // phone?: string;
  // address?: string;
  // dateOfBirth?: string;
  // gender?: number;
}

export interface UpdateUserDto {
  userId: number;
  username: string;
  email: string;
  // fullName?: string;
  // phone?: string;
  // address?: string;
  // dateOfBirth?: string | null;
  // gender?: number | null;
}

export const usersService = {
  async getAllUsers() {
    return await fetchClient("/admin/get-all-users");
  },

  async updateUserRole(userId: number, newRoleId: number) {
    return await fetchClient(`/admin/update-role/${userId}`, {
      method: "PUT",
      body: { newRoleId },
    });
  },

  async updateUser(userId: number, userData: Omit<UpdateUserDto, "userId">) {
    return await fetchClient(`/admin/update-user/${userId}`, {
      method: "PUT",
      body: { ...userData, userId },
    });
  },

  async deleteUser(userId: number) {
    return await fetchClient(`/admin/delete-user/${userId}`, {
      method: "DELETE",
    });
  },
};
