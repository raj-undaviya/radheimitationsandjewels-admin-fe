import ReportsHeader from "../../components/reports/ReportsHeader";
import StatsCards from "../../components/reports/StatsCards";
import SalesAnalytics from "../../components/reports/SalesAnalytics";
import OrderProcessing from "../../components/reports/OrderProcessing";
import ClientInsights from "../../components/reports/ClientInsights";

export default function Reports() {
    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-4">

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