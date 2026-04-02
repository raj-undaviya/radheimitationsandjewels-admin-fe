import ReportsHeader from "../../components/reports/ReportsHeader";
import StatsCards from "../../components/reports/StatsCards";
import SalesAnalytics from "../../components/reports/SalesAnalytics";
import OrderProcessing from "../../components/reports/OrderProcessing";
import ClientInsights from "../../components/reports/ClientInsights";

export default function Reports() {
    return (
        <div className="space-y-6">

            {/* HEADER */}
            <ReportsHeader />

            {/* STATS */}
            <StatsCards />

            {/* ANALYTICS */}
            <SalesAnalytics />

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderProcessing />
                <ClientInsights />
            </div>

        </div>
    );
}