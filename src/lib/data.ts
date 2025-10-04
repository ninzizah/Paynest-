import type {
  Employee,
  Role,
  Department,
  SalaryAdvanceRequest,
  LeaveRequest,
} from './types';
import {
  employees as initialEmployees,
  roles as initialRoles,
  departments as initialDepartments,
  salaryAdvanceRequests as initialSalaryAdvanceRequests,
  leaveRequests as initialLeaveRequests,
} from './db';

// Use let to make the arrays mutable for in-memory operations
let employees: Employee[] = [...initialEmployees];
let roles: Role[] = [...initialRoles];
let departments: Department[] = [...initialDepartments];
let salaryAdvanceRequests: SalaryAdvanceRequest[] = [...initialSalaryAdvanceRequests];
let leaveRequests: LeaveRequest[] = [...initialLeaveRequests];


// This is a temporary solution to allow adding data in-memory.
// A real application would use a database.
export function addEmployee(employee: Employee) {
  employees.push(employee);
}

export function addRole(role: Role) {
  roles.push(role);
}

export function addDepartment(department: Department) {
  departments.push(department);
}

export function addSalaryAdvanceRequest(request: SalaryAdvanceRequest) {
  salaryAdvanceRequests.unshift(request);
}

export function updateSalaryAdvanceStatus(
  id: string,
  status: 'Approved' | 'Rejected'
) {
  const request = salaryAdvanceRequests.find((req) => req.id === id);
  if (request) {
    request.status = status;
    return request;
  }
  return null;
}

export function updateRole(id: string, name: string) {
  const role = roles.find((r) => r.id === id);
  if (role) {
    role.name = name;
  }
}

export function deleteRole(id: string) {
  const index = roles.findIndex((r) => r.id === id);
  if (index > -1) {
    roles.splice(index, 1);
  }
}

export function updateDepartment(id: string, name: string) {
  const department = departments.find((d) => d.id === id);
  if (department) {
    department.name = name;
  }
}

export function deleteDepartment(id: string) {
  const index = departments.findIndex((d) => d.id === id);
  if (index > -1) {
    departments.splice(index, 1);
  }
}

// Export a function to get the current state of employees for other modules
export const getEmployees = () => employees;
export const getRoles = () => roles;
export const getDepartments = () => departments;
export const getSalaryAdvanceRequests = () => salaryAdvanceRequests;
export const getLeaveRequests = () => leaveRequests;
