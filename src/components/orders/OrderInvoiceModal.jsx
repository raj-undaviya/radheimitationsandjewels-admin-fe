import { IoClose } from "react-icons/io5";
import { downloadInvoice } from "../utils/downloadInvoice";

export default function OrderInvoiceModal({ isOpen,
    onClose,
    order,
    // mode = "view" 
}) {
    if (!isOpen || !order) return null;

    const subtotal = order.items?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) || 0;


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
                <div
                    id="invoice"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        padding: "20px",
                        fontFamily: "Arial, sans-serif"
                    }}
                >

                    {/* HEADER */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                        <div>
                            <h2 style={{ margin: 0, color: "#ea580c" }}>INVOICE</h2>
                            <p style={{ margin: 0, fontSize: "12px" }}>Order #{order.id}</p>
                        </div>

                        <div style={{ textAlign: "right", fontSize: "12px" }}>
                            <p style={{ margin: 0 }}><b>Date:</b></p>
                            <p style={{ margin: 0 }}>
                                {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* CUSTOMER + STATUS */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>

                        <div>
                            <p style={{ fontSize: "12px", color: "#555", marginBottom: "5px" }}>
                                <b>Customer Details</b>
                            </p>
                            <p style={{ margin: 0 }}>{order.name || "N/A"}</p>
                            <p style={{ margin: 0, fontSize: "12px" }}>{order.phone || "N/A"}</p>
                            <p style={{ margin: 0, fontSize: "12px" }}>{order.email || "N/A"}</p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: "12px", color: "#555", marginBottom: "5px" }}>
                                <b>Status</b>
                            </p>
                            <span
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    backgroundColor: "#f3f4f6",
                                    color: "#333"
                                }}
                            >
                                {order.status}
                            </span>
                        </div>

                    </div>

                    {/* ADDRESS */}
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ fontSize: "12px", color: "#555", marginBottom: "5px" }}>
                            <b>Shipping Address</b>
                        </p>
                        <p style={{ margin: 0 }}>{order.address || "N/A"}</p>
                    </div>

                    {/* TABLE */}
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginBottom: "20px",
                            fontSize: "12px"
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f3f4f6" }}>
                                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Product</th>
                                <th style={{ border: "1px solid #ddd" }}>Qty</th>
                                <th style={{ border: "1px solid #ddd" }}>Price</th>
                                <th style={{ border: "1px solid #ddd" }}>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items?.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                        {item.product_details?.name || "Product"}
                                    </td>
                                    <td style={{ textAlign: "center", border: "1px solid #ddd" }}>
                                        {item.quantity}
                                    </td>
                                    <td style={{ textAlign: "center", border: "1px solid #ddd" }}>
                                        ₹{item.price}
                                    </td>
                                    <td style={{ textAlign: "center", border: "1px solid #ddd" }}>
                                        ₹{item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* TOTAL */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ width: "250px", fontSize: "12px" }}>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
                                <span>Tax</span>
                                <span>₹0</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
                                <span>Shipping</span>
                                <span>₹0</span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: "bold",
                                    borderTop: "1px solid #ddd",
                                    marginTop: "8px",
                                    paddingTop: "8px"
                                }}
                            >
                                <span>Total</span>
                                <span>₹{subtotal}</span>
                            </div>

                        </div>
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


                    {/* {mode === "view" && ( */}
                    <button
                        onClick={() => downloadInvoice(order)}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Download Invoice
                    </button>
                    {/* )} */}

                </div>

            </div>
        </div>
    );
}