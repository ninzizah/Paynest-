import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { getEmployees, getSalaryAdvanceRequests } from '@/lib/data';
import { RequestAdvanceForm } from './RequestAdvanceForm';
import { AdvanceRequestsTable } from './AdvanceRequestsTable';

export default function FinancialServicesPage() {
  const employees = getEmployees();
  const salaryAdvanceRequests = getSalaryAdvanceRequests();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Embedded Financial Services
        </h2>
        <p className="text-muted-foreground">
          Access financial products directly through the Paynest platform.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RequestAdvanceForm employees={employees} />
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Salary Advance Requests</CardTitle>
          <CardDescription>
            Review and approve or reject salary advance requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdvanceRequestsTable requests={salaryAdvanceRequests} />
        </CardContent>
      </Card>
    </div>
  );
}
