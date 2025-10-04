
import { getEmployees, getSalaryAdvanceRequests } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Mail, User, Briefcase, Landmark } from 'lucide-react';
import { SalarySlip } from './SalarySlip';
import { SalaryAdvanceHistoryTable } from './SalaryAdvanceHistoryTable';

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const employee = getEmployees().find((e) => e.id === params.id);

  if (!employee) {
    notFound();
  }

  const employeeAdvanceRequests = getSalaryAdvanceRequests().filter(
    (req) => req.employee.id === params.id
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{employee.name}</h2>
          <p className="text-muted-foreground">{employee.role.name}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" /> Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{employee.role.name}</span>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{employee.department.name}</span>
            </div>
            <div className="flex items-center">
              <Landmark className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{formatter.format(employee.grossSalary)} / year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Salary Slip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SalarySlip employee={employee} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <SalaryAdvanceHistoryTable requests={employeeAdvanceRequests} />
      </div>
    </div>
  );
}
