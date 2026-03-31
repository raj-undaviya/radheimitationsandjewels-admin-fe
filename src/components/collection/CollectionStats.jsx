import { Package, ClipboardList, TrendingUp } from "lucide-react";

export default function CollectionStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                    <Package className="text-orange-500" size={18} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">TOTAL CATEGORIES</p>
                    <h2 className="text-xl font-semibold">12</h2>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                    <ClipboardList className="text-orange-500" size={18} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">SUB-ITEMS LISTED</p>
                    <h2 className="text-xl font-semibold">1,284</h2>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-black text-white rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                    <TrendingUp size={18} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">MONTHLY ENGAGEMENT</p>
                    <h2 className="text-xl font-semibold">+14.2%</h2>
                </div>
            </div>

        </div>
    );
}