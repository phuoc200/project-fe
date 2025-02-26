import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User, UpdateUserDto } from "@/services/users-service";

interface UserFormProps {
  user: User;
  onSubmit: (userData: Omit<UpdateUserDto, "userId">) => Promise<void>;
}

export function UserForm({ user, onSubmit }: UserFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData: Omit<UpdateUserDto, "userId"> = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      // fullName: (formData.get("fullName") as string) || undefined,
      // phone: (formData.get("phone") as string) || undefined,
      // address: (formData.get("address") as string) || undefined,
      // dateOfBirth: (formData.get("dateOfBirth") as string) || undefined,
      // gender: formData.get("gender")
      //   ? Number(formData.get("gender"))
      //   : undefined,
    };
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={user.username}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          required
        />
      </div>
      {/* <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" defaultValue={user.fullName} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={user.phone} />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={user.address} />
      </div>
      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          defaultValue={user.dateOfBirth}
        />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select name="gender" defaultValue={user.gender?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Male</SelectItem>
            <SelectItem value="1">Female</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <Button type="submit" className="w-full">
        Update User
      </Button>
    </form>
  );
}
