
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  addRoleAction,
  addDepartmentAction,
  updateRoleAction,
  deleteRoleAction,
  updateDepartmentAction,
  deleteDepartmentAction,
} from './actions';
import type { Role, Department } from '@/lib/types';
import { useFormStatus } from 'react-dom';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function AddRoleButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add Role
    </Button>
  );
}

function AddDepartmentButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add Department
    </Button>
  );
}

interface SettingsFormsProps {
  initialRoles: Role[];
  initialDepartments: Department[];
}

export function SettingsForms({
  initialRoles,
  initialDepartments,
}: SettingsFormsProps) {
  const { toast } = useToast();
  const roleFormRef = React.useRef<HTMLFormElement>(null);
  const departmentFormRef = React.useRef<HTMLFormElement>(null);

  const handleAddRole = async (formData: FormData) => {
    const result = await addRoleAction(formData);
    if (result.message.includes('successfully')) {
      toast({ title: 'Success', description: result.message });
      roleFormRef.current?.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.errors?.roleName?.[0] || result.message,
      });
    }
  };

  const handleAddDepartment = async (formData: FormData) => {
    const result = await addDepartmentAction(formData);
    if (result.message.includes('successfully')) {
      toast({ title: 'Success', description: result.message });
      departmentFormRef.current?.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.errors?.departmentName?.[0] || result.message,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6 h-48 overflow-y-auto pr-2">
            {initialRoles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between group"
              >
                <p className="font-medium">{role.name}</p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EditRoleDialog role={role} />
                  <DeleteDialog
                    id={role.id}
                    name={role.name}
                    action={deleteRoleAction}
                  />
                </div>
              </div>
            ))}
          </div>
          <Separator className="mb-4" />
          <form action={handleAddRole} ref={roleFormRef} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">New Role Name</Label>
              <Input
                id="roleName"
                name="roleName"
                placeholder="e.g. Graphic Designer"
              />
            </div>
            <AddRoleButton />
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Manage Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6 h-48 overflow-y-auto pr-2">
            {initialDepartments.map((dept) => (
              <div
                key={dept.id}
                className="flex items-center justify-between group"
              >
                <p className="font-medium">{dept.name}</p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EditDepartmentDialog department={dept} />
                   <DeleteDialog
                    id={dept.id}
                    name={dept.name}
                    action={deleteDepartmentAction}
                  />
                </div>
              </div>
            ))}
          </div>
          <Separator className="mb-4" />
          <form
            action={handleAddDepartment}
            ref={departmentFormRef}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="departmentName">New Department Name</Label>
              <Input
                id="departmentName"
                name="departmentName"
                placeholder="e.g. Design"
              />
            </div>
            <AddDepartmentButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function EditRoleDialog({ role }: { role: Role }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateRoleAction(formData);
    if (result.message.includes('successfully')) {
      toast({ title: 'Success', description: result.message });
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={role.id} />
          <div className="space-y-2">
            <Label htmlFor="roleNameEdit">Role Name</Label>
            <Input
              id="roleNameEdit"
              name="roleName"
              defaultValue={role.name}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


function EditDepartmentDialog({ department }: { department: Department }) {
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);
  
    const handleSubmit = async (formData: FormData) => {
      const result = await updateDepartmentAction(formData);
      if (result.message.includes('successfully')) {
        toast({ title: 'Success', description: result.message });
        setOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" value={department.id} />
            <div className="space-y-2">
              <Label htmlFor="departmentNameEdit">Department Name</Label>
              <Input
                id="departmentNameEdit"
                name="departmentName"
                defaultValue={department.name}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

function DeleteDialog({
  id,
  name,
  action,
}: {
  id: string;
  name: string;
  action: (formData: FormData) => Promise<{ message: string }>;
}) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    const result = await action(formData);
    if (result.message.includes('successfully')) {
      toast({ title: 'Success', description: result.message });
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{' '}
            <strong>{name}</strong> entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleSubmit}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
