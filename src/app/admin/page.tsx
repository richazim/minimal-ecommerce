import { formatCurrency } from "@/lib/utils/format"
import { fetchTotalSalesMetrics } from "./_actions/queries/orders/fetchTotalSalesMetrics"
import { fetchProductAvailabilityCounts } from "./_actions/queries/products/fetchProductAvailabilityCounts"
import { fetchUserMetrics } from "./_actions/queries/users/fetchUserMetrics"
import { DashboardCard } from "./_components/Card/DashboardCard"
import { formatNumber } from "./_lib/utils/format"


// Avant: AdminDashboard
// 🧠 Nouveau: AdminDashboardPage (optionnel pour Next.js clarté routing/pages)
export default async function AdminDashboardPage() {
  const [salesData, userData, productData] = await Promise.all([
    fetchTotalSalesMetrics(),
    fetchUserMetrics(),
    fetchProductAvailabilityCounts(),
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}
