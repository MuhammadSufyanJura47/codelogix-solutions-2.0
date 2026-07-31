import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "CODELOGIX Solutions admin dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="section-shell section-gap">
      <AdminDashboard />
    </div>
  );
}
