
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { requestSalaryAdvanceAction, FormState } from './actions';
import { Loader2, DollarSign } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Request Advance
    </Button>
  );
}

export function RequestAdvanceForm({ employees }: { employees: Employee[] }) {
  const { toast } = useToast();
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction] = useActionState(
    requestSalaryAdvanceAction,
    initialState
  );

  useEffect(() => {
    if (state.message === 'Success') {
      toast({
        title: 'Request Submitted',
        description:
          'Your salary advance request has been submitted for approval.',
      });
      // A full form reset would be ideal here, but is complex with server actions.
      // For now, we rely on revalidation to show the new request in the table.
    } else if (state.message && state.message !== 'Success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Salary Advance
          </CardTitle>
          <CardDescription>
            Request an advance on an upcoming paycheck.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee</Label>
            <Select name="employeeId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.employeeId && (
              <p className="text-sm text-destructive">{state.errors.employeeId[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (RWF)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 50000"
              required
            />
            {state.errors?.amount && (
              <p className="text-sm text-destructive">{state.errors.amount[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              name="reason"
              placeholder="Please provide a brief reason for the request."
              required
              rows={3}
            />
             {state.errors?.reason && (
              <p className="text-sm text-destructive">{state.errors.reason[0]}</p>
            )}
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            A small processing fee may apply. The requested amount will be deducted
            from the next salary. Maximum 50% of net monthly pay.
          </p>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
