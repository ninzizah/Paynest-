
'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying potentially applicable tax laws and rules based on an employee's profile.
 *
 * - taxLawIdentifier - An async function that takes employee profile data as input and returns a list of potentially applicable tax laws.
 * - TaxLawIdentifierInput - The input type for the taxLawIdentifier function.
 * - TaxLawIdentifierOutput - The output type for the taxLawIdentifier function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaxLawIdentifierInputSchema = z.object({
  employeeProfile: z
    .string()
    .describe(
      'A detailed description of the employee profile, including information such as location (always assume Kigali, Rwanda unless otherwise specified), role, salary in RWF, and benefits.'
    ),
});
export type TaxLawIdentifierInput = z.infer<typeof TaxLawIdentifierInputSchema>;

const TaxLawIdentifierOutputSchema = z.object({
  applicableTaxLaws: z
    .array(z.string())
    .describe(
      'A list of potentially applicable Rwandan tax laws and regulations based on the employee profile. Focus on PAYE (Pay As You Earn) and any other relevant income-related taxes.'
    ),
});
export type TaxLawIdentifierOutput = z.infer<typeof TaxLawIdentifierOutputSchema>;

export async function taxLawIdentifier(input: TaxLawIdentifierInput): Promise<TaxLawIdentifierOutput> {
  return taxLawIdentifierFlow(input);
}

const taxLawIdentifierPrompt = ai.definePrompt({
  name: 'taxLawIdentifierPrompt',
  input: {schema: TaxLawIdentifierInputSchema},
  output: {schema: TaxLawIdentifierOutputSchema},
  prompt: `You are an AI expert in Rwandan tax law and regulations. Based on the following employee profile, identify the potentially applicable Rwandan tax laws and regulations. The location is always Kigali, Rwanda, and the currency is RWF. Be as specific as possible, referencing articles or sections of the law if possible.

Employee Profile: {{{employeeProfile}}}

Applicable Rwandan Tax Laws:`,
});

const taxLawIdentifierFlow = ai.defineFlow(
  {
    name: 'taxLawIdentifierFlow',
    inputSchema: TaxLawIdentifierInputSchema,
    outputSchema: TaxLawIdentifierOutputSchema,
  },
  async input => {
    const {output} = await taxLawIdentifierPrompt(input);
    return output!;
  }
);
