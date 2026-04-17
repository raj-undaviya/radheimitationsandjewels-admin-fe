import { useEffect, useState } from "react";
import InquiryManager from "../../components/inquiry/InquiryManager";

import API from "../../api/axiosInstance";
import { AppointmentAdminAPI } from "../../api/api";

export default function Appointment() {

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await API.get(AppointmentAdminAPI());

      const apiData = res.data;

      // list
      setAppointments(apiData.data || []);

      // stats
      setStats({
        total: apiData.total,
        pending: apiData.pending,
        confirmed: apiData.confirmed,
        cancelled: apiData.cancelled,
        completed: apiData.completed,
      });

    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InquiryManager
      data={appointments}
      stats={stats}
      loading={loading}
      refresh={fetchAppointments}
    />
  );
}