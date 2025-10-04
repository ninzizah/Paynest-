
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  addSalaryAdvanceRequest,
  getEmployees,
  updateSalaryAdvanceStatus,
} from '@/lib/data';

const schema = z.object({
  employeeId: z.string().min(1, 'Employee is required.'),
  amount: z.coerce.number().positive('Amount must be a positive number.'),
  reason: z
    .string()
    .min(10, 'Reason must be at least 10 characters long.')
    .max(100, 'Reason must be 100 characters or less.'),
});

export type FormState = {
  message: string;
  errors?: {
    employeeId?: string[];
    amount?: string[];
    reason?: string[];
  };
};

let nextId = 3;

export async function requestSalaryAdvanceAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { employeeId, amount, reason } = validatedFields.data;

  try {
    const employee = getEmployees().find((e) => e.id === employeeId);
    if (!employee) {
      return { message: 'Invalid Employee selected.' };
    }

    const monthlySalary = employee.grossSalary / 12;
    if (amount > monthlySalary * 0.5) {
      return {
        message: 'Advance amount cannot exceed 50% of monthly salary.',
      };
    }

    const newRequest = {
      id: `sa${nextId++}`,
      employee: {
        id: employee.id,
        name: employee.name,
        grossSalary: employee.grossSalary,
      },
      amount,
      reason,
      status: 'Pending' as const,
      requestDate: new Date().toISOString().split('T')[0],
    };

    addSalaryAdvanceRequest(newRequest);
    revalidatePath('/financial-services');
    revalidatePath(`/employees/${employeeId}`);

    return { message: 'Success' };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while submitting the request.' };
  }
}

export async function updateSalaryAdvanceStatusAction(
  id: string,
  status: 'Approved' | 'Rejected'
) {
  try {
    const request = updateSalaryAdvanceStatus(id, status);
    if (request) {
      revalidatePath('/financial-services');
      revalidatePath(`/employees/${request.employee.id}`);
      return { message: 'Success' };
    }
    return { message: 'Request not found.' };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while updating the status.' };
  }
}
