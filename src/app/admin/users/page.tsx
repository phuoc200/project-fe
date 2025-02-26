"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  usersService,
  type User,
  type UpdateUserDto,
} from "@/services/users-service";
import { UserForm } from "@/app/components/user-form";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData: Omit<UpdateUserDto, "userId">) => {
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
  };

  const handleDeleteUser = async () => {
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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId || user.username}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roleId}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingUser(user);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center space-x-2">
        <Input
          type="number"
          placeholder="Enter User ID to delete"
          value={deleteUserId || ""}
          onChange={(e) => setDeleteUserId(Number(e.target.value))}
        />
        <Button
          variant="destructive"
          onClick={handleDeleteUser}
          disabled={!deleteUserId}
        >
          Delete User
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user profile here.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <>
              <div className="mb-4">
                <Label htmlFor="userId">User ID</Label>
                <Input id="userId" value={editingUser.userId} disabled />
              </div>
              <UserForm user={editingUser} onSubmit={handleUpdateUser} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
