import { IoClose } from "react-icons/io5";
import jsPDF from "jspdf";

export default function OrderInvoiceModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    const subtotal = order.items?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) || 0;

    // 🔥 DOWNLOAD FUNCTION
    const downloadInvoice = () => {
        const pdf = new jsPDF();

        let y = 15;

        // TITLE
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("INVOICE", 90, y);

        y += 10;

        // ORDER INFO
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        pdf.text(`Order ID: ${order.id}`, 10, y);
        pdf.text(
            `Date: ${new Date(order.created_at).toLocaleDateString()}`,
            140,
            y
        );

        y += 10;

        // CUSTOMER
        pdf.setFont("helvetica", "bold");
        pdf.text("Customer Details:", 10, y);

        y += 6;
        pdf.setFont("helvetica", "normal");

        pdf.text(`Name: ${order.name || "N/A"}`, 10, y);
        y += 6;
        pdf.text(`Phone: ${order.phone || "N/A"}`, 10, y);
        y += 6;
        pdf.text(`Email: ${order.email || "N/A"}`, 10, y);

        y += 10;

        // ADDRESS
        pdf.setFont("helvetica", "bold");
        pdf.text("Shipping Address:", 10, y);

        y += 6;
        pdf.setFont("helvetica", "normal");
        pdf.text(order.address || "N/A", 10, y);

        y += 10;

        // TABLE HEADER
        pdf.setFont("helvetica", "bold");
        pdf.text("Product", 10, y);
        pdf.text("Qty", 110, y);
        pdf.text("Price", 140, y);
        pdf.text("Total", 170, y);

        y += 5;
        pdf.line(10, y, 200, y);
        y += 6;

        // PRODUCTS
        pdf.setFont("helvetica", "normal");

        order.items?.forEach((item) => {
            const total = item.price * item.quantity;

            pdf.text(item.product_details?.name || "Product", 10, y);
            pdf.text(String(item.quantity), 110, y);
            pdf.text(`₹${item.price}`, 140, y);
            pdf.text(`₹${total}`, 170, y);

            y += 8;
        });

        y += 5;
        pdf.line(10, y, 200, y);
        y += 8;

        // TOTAL
        pdf.setFont("helvetica", "bold");
        pdf.text(`Subtotal: ₹${subtotal}`, 140, y);
        y += 6;
        pdf.text(`Tax: ₹0`, 140, y);
        y += 6;
        pdf.text(`Shipping: ₹0`, 140, y);
        y += 6;
        pdf.text(`Total: ₹${subtotal}`, 140, y);

        // SAVE
        pdf.save(`invoice-${order.id}.pdf`);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-3xl rounded-xl p-6 shadow-xl relative">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500"
                >
                    <IoClose size={22} />
                </button>

                {/* CONTENT */}
                <div id="invoice">

                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Order Invoice
                    </h2>

                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold">Order ID</p>
                            <p>{order.id}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Date</p>
                            <p>{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold">Customer Details</p>
                        <p>Name: {order.name || "N/A"}</p>
                        <p>Phone: {order.phone || "N/A"}</p>
                        <p>Email: {order.email || "N/A"}</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold">Shipping Address</p>
                        <p>{order.address || "N/A"}</p>
                    </div>

                    <table className="w-full text-sm border mb-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items?.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2">
                                        {item.product_details?.name}
                                    </td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">₹{item.price}</td>
                                    <td className="text-center font-semibold">
                                        ₹{item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-right">
                        <p>Subtotal: ₹{subtotal}</p>
                        <p>Tax: ₹0</p>
                        <p>Shipping: ₹0</p>
                        <p className="font-semibold">Total: ₹{subtotal}</p>
                    </div>

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Close
                    </button>

                    <button
                        onClick={downloadInvoice}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Download Invoice
                    </button>
                </div>

            </div>
        </div>
    );
}