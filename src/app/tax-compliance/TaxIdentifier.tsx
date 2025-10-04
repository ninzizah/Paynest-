
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { identifyTaxLaws, FormState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, List, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Employee } from '@/lib/types';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Identify Tax Laws
    </Button>
  );
}

export function TaxIdentifier({ employees }: { employees: Employee[] }) {
  const initialState: FormState = { message: '', laws: [] };
  const [state, formAction] = useActionState(identifyTaxLaws, initialState);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState('');
  const [profileText, setProfileText] = React.useState('');

  useEffect(() => {
    if (selectedEmployeeId) {
      const selectedEmployee = employees.find(
        (e) => e.id === selectedEmployeeId
      );
      if (selectedEmployee) {
        setProfileText(selectedEmployee.profileDescription);
      }
    } else {
        setProfileText('');
    }
  }, [selectedEmployeeId, employees]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Employee Profile</CardTitle>
            <CardDescription>
              Select a pre-filled employee profile or enter the details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-select">Select Employee</Label>
              <Select
                value={selectedEmployeeId}
                onValueChange={setSelectedEmployeeId}
              >
                <SelectTrigger id="employee-select">
                  <SelectValue placeholder="Select an employee to pre-fill..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              name="employeeProfile"
              placeholder="e.g., A senior software engineer based in Kigali, earning 24,000,000 RWF annually with standard health benefits."
              rows={8}
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              required
            />
            {state.errors?.employeeProfile && (
              <p className="text-sm text-destructive">
                {state.errors.employeeProfile[0]}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Applicable Tax Laws</CardTitle>
          <CardDescription>
            The AI will list potentially relevant tax rules and regulations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.laws.length > 0 ? (
            <Alert>
              <List className="h-4 w-4" />
              <AlertTitle>Identified Laws</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {state.laws.map((law, index) => (
                    <li key={index}>{law}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
             <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Waiting for input</AlertTitle>
              <AlertDescription>
                Your results will be displayed here.
              </AlertDescription>
            </Alert>
          )}

           {state.message && state.message !== 'Success' && state.laws.length === 0 && (
             <Alert variant="destructive" className="mt-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
