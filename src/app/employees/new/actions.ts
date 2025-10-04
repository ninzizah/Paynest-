'use server';

import { z } from 'zod';
import { getRoles, getDepartments, addEmployee, getEmployees } from '@/lib/data';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z
    .string()
    .email('Invalid email address.')
    .refine(
      (email) =>
        !getEmployees().some(
          (e) => e.email.toLowerCase() === email.toLowerCase()
        ),
      { message: 'An account with this email already exists.' }
    ),
  systemRole: z.enum(['Admin', 'HR', 'Employee']),
  roleId: z.string().min(1, 'Role is required.'),
  departmentId: z.string().min(1, 'Department is required.'),
  grossSalary: z.coerce.number().positive('Salary must be a positive number.'),
});

export async function addEmployeeAction(
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    systemRole?: string[];
    roleId?: string[];
    departmentId?: string[];
    grossSalary?: string[];
  };
}> {
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    email,
    systemRole,
    roleId,
    departmentId,
    grossSalary,
  } = validatedFields.data;

  try {
    const role = getRoles().find((r) => r.id === roleId);
    const department = getDepartments().find((d) => d.id === departmentId);

    if (!role || !department) {
      return { message: 'Invalid Role or Department.' };
    }

    const newEmployee = {
      id: `e${getEmployees().length + 1}`,
      name,
      email,
      systemRole,
      role,
      department,
      grossSalary,
      profileDescription: `A ${role.name} in the ${department.name} department, earning ${grossSalary} RWF annually.`,
    };

    addEmployee(newEmployee);

    revalidatePath('/employees');
    revalidatePath('/');

    return { message: 'Success' };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while adding the employee.' };
  }
}
