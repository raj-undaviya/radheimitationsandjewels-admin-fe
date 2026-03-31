export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    const getPages = () => {
        const pages = [];

        // Always show first page
        if (currentPage > 2) {
            pages.push(1);
        }

        // Left dots
        if (currentPage > 3) {
            pages.push("...");
        }

        // Middle pages
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push(i);
            }
        }

        // Right dots
        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        // Last page
        if (currentPage < totalPages - 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center justify-between mt-6 text-sm w-full">

            {/* LEFT */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-400 hover:text-black disabled:opacity-30 hidden sm:block"
            >
                ← Previous
            </button>

            {/* CENTER */}
            <div className="flex items-center justify-center flex-1 gap-2">

                {pages.map((page, index) => {

                    if (page === "...") {
                        return (
                            <span key={index} className="px-1 text-gray-400">
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition ${currentPage === page
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}

            </div>

            {/* RIGHT */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-400 hover:text-black disabled:opacity-30 hidden sm:block"
            >
                Next →
            </button>

        </div>
    );
}