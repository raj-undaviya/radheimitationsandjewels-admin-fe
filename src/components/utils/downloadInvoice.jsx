import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadInvoice = async (order) => {
    const element = document.getElementById("invoice");

    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`invoice-${order.id}.pdf`);
};