'use server';

import { taxLawIdentifier } from '@/ai/flows/tax-law-identifier';
import { z } from 'zod';

const schema = z.object({
  employeeProfile: z.string().min(1, 'Employee profile cannot be empty.'),
});

export type FormState = {
  message: string;
  laws: string[];
  errors?: {
    employeeProfile?: string[];
  };
};

export async function identifyTaxLaws(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    employeeProfile: formData.get('employeeProfile'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      laws: [],
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await taxLawIdentifier({ employeeProfile: validatedFields.data.employeeProfile });
    if (result.applicableTaxLaws.length > 0) {
      return { message: 'Success', laws: result.applicableTaxLaws };
    } else {
      return { message: 'No specific tax laws were identified.', laws: [] };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while identifying tax laws.', laws: [] };
  }
}
