export type Department = {
  id: string;
  name: string;
};

export type Role = {
  id: string;
  name: string;
};

export type SystemRole = 'Admin' | 'HR' | 'Employee';

export type User = {
  id: string;
  name: string;
  email: string;
  systemRole: SystemRole;
};

export type Employee = User & {
  role: Role;
  department: Department;
  grossSalary: number;
  profileDescription: string;
};

export type LeaveRequest = {
  id:string;
  employee: Pick<Employee, 'id' | 'name'>;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type SalaryAdvanceRequest = {
  id: string;
  employee: Pick<Employee, 'id' | 'name' | 'grossSalary'>;
  amount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
};
