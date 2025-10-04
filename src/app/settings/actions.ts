
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  addRole,
  addDepartment,
  updateRole,
  deleteRole,
  updateDepartment,
  deleteDepartment,
} from '@/lib/data';

const addRoleSchema = z.object({
  roleName: z.string().min(2, 'Role name must be at least 2 characters.'),
});

const addDepartmentSchema = z.object({
  departmentName: z
    .string()
    .min(2, 'Department name must be at least 2 characters.'),
});

const editRoleSchema = z.object({
  id: z.string(),
  roleName: z.string().min(2, 'Role name must be at least 2 characters.'),
});

const editDepartmentSchema = z.object({
    id: z.string(),
    departmentName: z
      .string()
      .min(2, 'Department name must be at least 2 characters.'),
  });

let nextRoleId = 7;
let nextDeptId = 5;

export async function addRoleAction(formData: FormData) {
  const validatedFields = addRoleSchema.safeParse({
    roleName: formData.get('roleName'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    addRole({
      id: `r${nextRoleId++}`,
      name: validatedFields.data.roleName,
    });
    revalidatePath('/settings');
    revalidatePath('/employees/new');
    return { message: 'Role added successfully.' };
  } catch (error) {
    return { message: 'An error occurred.' };
  }
}

export async function addDepartmentAction(formData: FormData) {
  const validatedFields = addDepartmentSchema.safeParse({
    departmentName: formData.get('departmentName'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    addDepartment({
      id: `d${nextDeptId++}`,
      name: validatedFields.data.departmentName,
    });
    revalidatePath('/settings');
    revalidatePath('/');
    revalidatePath('/employees/new');
    return { message: 'Department added successfully.' };
  } catch (error) {
    return { message: 'An error occurred.' };
  }
}

export async function updateRoleAction(formData: FormData) {
    const validatedFields = editRoleSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { message: "Validation failed." };
    }
    const { id, roleName } = validatedFields.data;
    try {
        updateRole(id, roleName);
        revalidatePath('/settings');
        revalidatePath('/employees');
        return { message: 'Role updated successfully.'};
    } catch(e) {
        return { message: 'An error occurred.'};
    }
}

export async function deleteRoleAction(formData: FormData) {
    const id = formData.get('id') as string;
    try {
        deleteRole(id);
        revalidatePath('/settings');
        revalidatePath('/employees');
        return { message: 'Role deleted successfully.'};
    } catch(e) {
        return { message: 'An error occurred.'};
    }
}

export async function updateDepartmentAction(formData: FormData) {
    const validatedFields = editDepartmentSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return { message: "Validation failed." };
    }
    const { id, departmentName } = validatedFields.data;

    try {
        updateDepartment(id, departmentName);
        revalidatePath('/settings');
        revalidatePath('/employees');
        revalidatePath('/');
        return { message: 'Department updated successfully.'};
    } catch(e) {
        return { message: 'An error occurred.'};
    }
}

export async function deleteDepartmentAction(formData: FormData) {
    const id = formData.get('id') as string;
    try {
        deleteDepartment(id);
        revalidatePath('/settings');
        revalidatePath('/employees');
        revalidatePath('/');
        return { message: 'Department deleted successfully.'};
    } catch(e) {
        return { message: 'An error occurred.'};
    }
}
