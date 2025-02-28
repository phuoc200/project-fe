"use client";

import { useEffect } from "react";
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
import { UserForm } from "@/app/components/user-form";
import { useUser } from "@/hooks/use-user";

export default function UsersPage() {
  const {
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
  } = useUser();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
