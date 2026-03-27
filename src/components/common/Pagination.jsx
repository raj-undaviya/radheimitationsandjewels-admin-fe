export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">

            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
            >
                ← Previous
            </button>

            {/* Pages */}
            <div className="flex gap-2 flex-wrap justify-center">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1.5 rounded-lg border
                        ${currentPage === page
                                ? "bg-orange-500 text-white"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
            >
                Next →
            </button>

        </div>
    );
}