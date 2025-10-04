
import { getRoles, getDepartments } from '@/lib/data';
import { SettingsForms } from './SettingsForms';

export default function SettingsPage() {
  const roles = getRoles();
  const departments = getDepartments();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your organization's roles and departments.
        </p>
      </div>
      <SettingsForms initialRoles={roles} initialDepartments={departments} />
    </div>
  );
}
