import { TaxIdentifier } from "./TaxIdentifier";
import { getEmployees } from "@/lib/data";

export default function TaxCompliancePage() {
  const employees = getEmployees();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Automated Tax Law Identifier</h2>
      </div>
      <p className="text-muted-foreground">
        Use our AI-powered tool to identify potentially applicable tax laws and rules for an employee profile.
      </p>
      <TaxIdentifier employees={employees}/>
    </div>
  );
}
