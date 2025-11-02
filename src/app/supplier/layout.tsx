import { SupplierSidebar } from "@/components/supplier/supplier-sidebar";

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <SupplierSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
