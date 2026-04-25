import { FileText, Truck, Shield, RotateCcw, Eye, Pencil } from "lucide-react";
import { useState, useEffect } from "react";

import API from "../../api/axiosInstance";
import { PoliciesAPI } from "../../api/api";

import AddPolicyModal from "./AddPolicyModal";
import PolicyModal from "./PolicyModal";

export default function PoliciesDashboard() {

    const [openModal, setOpenModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const [policies, setPolicies] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [selectedPolicyId, setSelectedPolicyId] = useState(null);

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                setLoading(true);
                const res = await API.get(PoliciesAPI());
                setPolicies(res.data.data);
                setStats(res.data.stats);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    const getIcon = (type) => {
        if (type === "terms_and_conditions") return <FileText className="text-orange-500" />;
        if (type === "privacy_policy") return <Shield className="text-orange-500" />;
        if (type === "shipping_policy") return <Truck className="text-orange-500" />;
        if (type === "refund_policy") return <RotateCcw className="text-orange-500" />;
        return <FileText className="text-orange-500" />;
    };

    return (
        <>
            <div className="px-3 sm:px-6 py-5 space-y-6 max-w-7xl mx-auto">

                {/* 🔥 RESPONSIVE HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Site Policies
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Manage your store policies
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setSelectedPolicy(null);
                            setOpenModal(true);
                        }}
                        className="w-full sm:w-auto bg-orange-500 text-white px-5 py-2 rounded-full text-sm"
                    >
                        + Add Policy
                    </button>
                </div>

                {/* 🔥 RESPONSIVE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-5 shadow-sm animate-pulse space-y-4"
                            >
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-3 bg-gray-200 rounded w-full" />
                                <div className="h-3 bg-gray-200 rounded w-3/4" />
                            </div>
                        ))
                    ) : (
                        policies.map((policy) => (
                            <div
                                key={policy.id}
                                className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                            >

                                <div className="space-y-2">
                                    <div className="mb-2">
                                        {getIcon(policy.policy_type)}
                                    </div>

                                    <h3 className="font-semibold text-base sm:text-lg">
                                        {policy.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {policy.description}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-4">

                                    <span className="text-[10px] sm:text-xs text-gray-400">
                                        {policy.last_updated}
                                    </span>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => {
                                                setSelectedPolicyId(policy.id);
                                                setViewModal(true);
                                            }}
                                        >
                                            <Eye size={16} />
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedPolicy(policy);
                                                setOpenModal(true);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>

                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {/* 🔥 RESPONSIVE STATS */}
                {loading ? (
                    <div className="bg-white rounded-2xl p-5 space-y-3 animate-pulse">
                        <div className="h-5 w-24 bg-gray-200 rounded" />
                        <div className="h-5 w-24 bg-gray-200 rounded" />
                        <div className="h-2 w-full bg-gray-200 rounded" />
                    </div>
                ) : stats && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">

                        <div>
                            <p className="text-xs text-gray-400">TOTAL POLICIES</p>
                            <h2 className="text-lg sm:text-xl font-bold">
                                {stats.total_policies}
                            </h2>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">NEXT AUDIT</p>
                            <h2 className="text-lg sm:text-xl font-bold">
                                {stats.next_audit_date || "N/A"}
                            </h2>
                        </div>

                        <div className="w-full sm:w-1/3">
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-orange-500"
                                    style={{ width: `${stats.compliance_score}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">
                                {stats.compliance_score}% Compliance
                            </p>
                        </div>

                    </div>
                )}

            </div>

            {/* MODALS */}
            <AddPolicyModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={() => setOpenModal(false)}
                editData={selectedPolicy}
                policies={policies}
            />

            <PolicyModal
                isOpen={viewModal}
                onClose={() => setViewModal(false)}
                policyId={selectedPolicyId}
            />
        </>
    );
}