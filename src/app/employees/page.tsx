
import { getEmployees, getRoles, getDepartments } from '@/lib/data';
import { EmployeeTable } from './EmployeeTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function EmployeesPage() {
  // In a real app, you'd fetch this data from an API
  const allEmployees = getEmployees();
  const allRoles = getRoles();
  const allDepartments = getDepartments();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employee Directory</h2>
        <Button asChild>
          <Link href="/employees/new">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Link>
        </Button>
      </div>
      <EmployeeTable
        employees={allEmployees}
        roles={allRoles}
        departments={allDepartments}
      />
    </div>
  );
}
