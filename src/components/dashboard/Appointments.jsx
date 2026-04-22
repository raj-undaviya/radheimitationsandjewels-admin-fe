import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axiosInstance";
import { AppointmentAdminAPI } from "../../api/api";

export default function Appointments() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ NEW
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get(AppointmentAdminAPI());
                setData(res.data.data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false); // ✅ IMPORTANT
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow">

            <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Appointments</h2>

                <span
                    onClick={() => navigate("/appointments")}
                    className="text-orange-500 text-xs cursor-pointer"
                >
                    VIEW ALL
                </span>
            </div>

            <div className="space-y-3">

                {loading ? (
                    // 🔥 SKELETON
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center animate-pulse">

                            <div className="w-32 h-3 bg-gray-200 rounded"></div>

                            <div className="w-24 h-3 bg-gray-200 rounded"></div>

                        </div>
                    ))
                ) : data.length === 0 ? (
                    <p className="text-sm text-gray-400">No appointments</p>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">

                            {/* NAME */}
                            <p className="text-sm">{item.customer_name}</p>

                            {/* DATE + TIME */}
                            <p className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString()} | {item.time_slot}
                            </p>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}