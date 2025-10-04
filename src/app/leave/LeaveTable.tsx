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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import type { LeaveRequest } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface LeaveTableProps {
  initialRequests: LeaveRequest[];
}

export function LeaveTable({ initialRequests }: LeaveTableProps) {
  const [requests, setRequests] = React.useState(initialRequests);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const { toast } = useToast();

  const handleStatusChange = (
    id: string,
    status: 'Approved' | 'Rejected'
  ) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
    toast({
      title: `Request ${status}`,
      description: `Leave request has been successfully ${status.toLowerCase()}.`,
    });
  };

  const filteredRequests = requests.filter(
    (req) => statusFilter === 'all' || req.status === statusFilter
  );

  return (
    <div>
      <div className="mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  {request.employee.name}
                </TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === 'Approved'
                        ? 'default'
                        : request.status === 'Rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={cn(request.status === 'Approved' && 'bg-green-600')}
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
                        onClick={() => handleStatusChange(request.id, 'Approved')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleStatusChange(request.id, 'Rejected')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
