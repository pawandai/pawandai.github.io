import AdminPanelLayout from "@/components/shared/admin/adminPanelLayout";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
