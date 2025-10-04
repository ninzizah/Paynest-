
'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Employee } from '@/lib/types';
import { Printer } from 'lucide-react';
import React from 'react';

export function SalarySlip({ employee }: { employee: Employee }) {
  const slipRef = React.useRef<HTMLDivElement>(null);
  const [payDate, setPayDate] = React.useState('');
  const [payPeriod, setPayPeriod] = React.useState('');

  React.useEffect(() => {
    const currentDate = new Date();
    setPayDate(currentDate.toLocaleDateString());
    setPayPeriod(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }));
  }, []);


  const handlePrint = () => {
    const printContents = slipRef.current?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const calculateRwandanTaxes = (monthlySalary: number) => {
    if (monthlySalary <= 60000) {
      return 0;
    } else if (monthlySalary <= 100000) {
      return (monthlySalary - 60000) * 0.2;
    } else {
      return 8000 + (monthlySalary - 100000) * 0.3;
    }
  };

  const grossMonthly = employee.grossSalary / 12;
  const taxes = calculateRwandanTaxes(grossMonthly);
  const netPay = grossMonthly - taxes;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div ref={slipRef} className="p-6 bg-card rounded-lg border text-card-foreground">
        <header className="flex justify-between items-center pb-4">
          <div>
            <h3 className="text-xl font-bold">Paynest Lite</h3>
            <p className="text-sm text-muted-foreground">Salary Slip</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{employee.name}</p>
            <p className="text-sm">{employee.role.name}</p>
          </div>
        </header>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Pay Period</p>
            <p className="font-semibold">{payPeriod}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Pay Date</p>
            <p className="font-semibold">{payDate}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <p>Gross Monthly Salary</p>
            <p className="text-right font-medium">{formatter.format(grossMonthly)}</p>
            <p>Taxes (Rwandan PAYE)</p>
            <p className="text-right font-medium text-destructive">-{formatter.format(taxes)}</p>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center pt-2">
          <p className="text-lg font-bold">Net Pay</p>
          <p className="text-lg font-bold text-primary">{formatter.format(netPay)}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print / Download PDF
        </Button>
      </div>
    </div>
  );
}
