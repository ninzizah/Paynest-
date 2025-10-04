import type {
  Department,
  Role,
  Employee,
  LeaveRequest,
  SalaryAdvanceRequest,
} from './types';

export let departments: Department[] = [
  { id: 'd1', name: 'Engineering' },
  { id: 'd2', name: 'Product' },
  { id: 'd3', name: 'Marketing' },
  { id: 'd4', name: 'HR' },
];

export let roles: Role[] = [
  { id: 'r1', name: 'Software Engineer' },
  { id: 'r2', name: 'Senior Software Engineer' },
  { id: 'r3', name: 'Product Manager' },
  { id: 'r4', name: 'Marketing Lead' },
  { id: 'r5', name: 'HR Manager' },
  { id: 'r6', name: 'UI/UX Designer' },
];

export let employees: Employee[] = [
   {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@paynest.com',
    systemRole: 'Admin',
    role: roles[4], // HR Manager
    department: departments[3], // HR
    grossSalary: 30000000,
    profileDescription: 'System Administrator with full access.',
  },
  {
    id: 'hr',
    name: 'HR User',
    email: 'hr@paynest.com',
    systemRole: 'HR',
    role: roles[4], // HR Manager
    department: departments[3], // HR
    grossSalary: 18000000,
    profileDescription: 'Human Resources manager with access to employee data and financial services.',
  },
  {
    id: 'e1',
    name: 'Ava Johnson',
    email: 'ava.johnson@paynest.com',
    systemRole: 'Employee',
    role: roles[1], // Senior Software Engineer
    department: departments[0], // Engineering
    grossSalary: 24000000,
    profileDescription:
      'A senior software engineer based in Kigali, earning 24,000,000 RWF annually with standard health benefits.',
  },
  {
    id: 'e2',
    name: 'Liam Smith',
    email: 'liam.smith@paynest.com',
    systemRole: 'Employee',
    role: roles[2], // Product Manager
    department: departments[1], // Product
    grossSalary: 20000000,
    profileDescription:
      'Product manager located in Kigali, with a salary of 20,000,000 RWF. Receives an annual performance bonus.',
  },
];

export let leaveRequests: LeaveRequest[] = [
  {
    id: 'l1',
    employee: { id: 'e1', name: 'Ava Johnson' },
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    reason: 'Vacation',
    status: 'Approved',
  },
  {
    id: 'l2',
    employee: { id: 'e1', name: 'Ava Johnson' },
    startDate: '2024-08-10',
    endDate: '2024-08-11',
    reason: 'Sick Leave',
    status: 'Pending',
  },
];

export let salaryAdvanceRequests: SalaryAdvanceRequest[] = [
  {
    id: 'sa1',
    employee: {
      id: 'e2',
      name: 'Liam Smith',
      grossSalary: 20000000,
    },
    amount: 50000,
    reason: 'Urgent family matter',
    status: 'Approved',
    requestDate: '2024-07-15',
  },
  {
    id: 'sa2',
    employee: {
      id: 'e1',
      name: 'Ava Johnson',
      grossSalary: 24000000,
    },
    amount: 100000,
    reason: 'Medical emergency',
    status: 'Pending',
    requestDate: '2024-07-20',
  },
];
