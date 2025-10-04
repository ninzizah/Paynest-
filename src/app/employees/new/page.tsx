
import { getRoles, getDepartments } from '@/lib/data';
import { AddEmployeeForm } from './AddEmployeeForm';

export default function AddEmployeePage() {
  const roles = getRoles();
  const departments = getDepartments();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add New Employee</h2>
        <p className="text-muted-foreground">
          Fill out the form below to add a new employee to the directory.
        </p>
      </div>
      <AddEmployeeForm roles={roles} departments={departments} />
    </div>
  );
}
