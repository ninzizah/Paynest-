'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface DepartmentChartProps {
  data: {
    name: string;
    employees: number;
  }[];
}

const chartConfig = {
  employees: {
    label: 'Employees',
    color: 'hsl(var(--chart-1))',
  },
};

export function DepartmentChart({ data }: DepartmentChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
        accessibilityLayer
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="employees" fill="var(--color-employees)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
