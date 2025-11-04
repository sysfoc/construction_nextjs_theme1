import { DashboardStats } from "@/app/admin/components/dashboard/stats"
import { RecentActivity } from "@/app/admin/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-[var(--header-text)] mb-6">Dashboard</h1>

      <DashboardStats />
      <RecentActivity />
    </div>
  )
}
