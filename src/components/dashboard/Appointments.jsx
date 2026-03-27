export default function Appointments() {

    const data = [
        { name: "Amara Singh", time: "14:30" },
        { name: "Rohan Mehta", time: "16:00" },
        { name: "Elena Petrova", time: "09:30" },
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow">

            <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Appointments</h2>
                <span className="text-orange-500 text-xs cursor-pointer">VIEW ALL</span>
            </div>

            <div className="space-y-3">
                {data.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}