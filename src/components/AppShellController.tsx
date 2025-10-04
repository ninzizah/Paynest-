import { AppShell } from './AppShell';

export function AppShellController({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
