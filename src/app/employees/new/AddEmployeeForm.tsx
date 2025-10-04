'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addEmployeeAction } from './actions';
import { Loader2 } from 'lucide-react';
import type { Role, Department } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    systemRole?: string[];
    roleId?: string[];
    departmentId?: string[];
    grossSalary?: string[];
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add Employee
    </Button>
  );
}

interface AddEmployeeFormProps {
  roles: Role[];
  departments: Department[];
}

export function AddEmployeeForm({ roles, departments }: AddEmployeeFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction] = useActionState(addEmployeeAction, initialState);

  useEffect(() => {
    if (state.message === 'Success') {
      toast({
        title: 'Employee Added',
        description: 'The new employee has been successfully added.',
      });
      router.push('/employees');
    } else if (state.message && state.message !== 'Success' && state.message !== '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, router, toast]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
          <CardDescription>
            Please provide the required information for the new employee.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="e.g. John Doe" required />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john.doe@paynest.com"
              required
            />
            {state.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="systemRole">System Role</Label>
            <Select name="systemRole" defaultValue="Employee" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a system role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.systemRole && (
              <p className="text-sm text-destructive">{state.errors.systemRole[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="roleId">Job Role</Label>
            <Select name="roleId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.roleId && (
              <p className="text-sm text-destructive">
                {state.errors.roleId[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="departmentId">Department</Label>
            <Select name="departmentId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.departmentId && (
              <p className="text-sm text-destructive">
                {state.errors.departmentId[0]}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="grossSalary">Annual Gross Salary (RWF)</Label>
            <Input
              id="grossSalary"
              name="grossSalary"
              type="number"
              placeholder="e.g. 12000000"
              required
            />
            {state.errors?.grossSalary && (
              <p className="text-sm text-destructive">
                {state.errors.grossSalary[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
