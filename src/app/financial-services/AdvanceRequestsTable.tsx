
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SalaryAdvanceRequest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateSalaryAdvanceStatusAction } from './actions';

interface AdvanceRequestsTableProps {
  requests: SalaryAdvanceRequest[];
}

export function AdvanceRequestsTable({
  requests: initialRequests,
}: AdvanceRequestsTableProps) {
  const { toast } = useToast();

  const handleStatusChange = async (
    id: string,
    status: 'Approved' | 'Rejected'
  ) => {
    const result = await updateSalaryAdvanceStatusAction(id, status);
    if (result.message === 'Success') {
      toast({
        title: `Request ${status}`,
        description: `The salary advance request has been ${status.toLowerCase()}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No salary advance requests found.
              </TableCell>
            </TableRow>
          ) : (
            initialRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.employee.name}
                </TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{formatter.format(request.amount)}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {request.reason}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === 'Approved'
                        ? 'default'
                        : request.status === 'Rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={cn(
                      request.status === 'Approved' && 'bg-green-600'
                    )}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === 'Pending' && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-500 hover:bg-green-50 hover:text-green-600 border-green-500"
                        onClick={() =>
                          handleStatusChange(request.id, 'Approved')
                        }
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          handleStatusChange(request.id, 'Rejected')
                        }
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
