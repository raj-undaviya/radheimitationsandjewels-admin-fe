export default function Pagination({ currentPage, totalPages, onPageChange,
}) {

    const getPages = () => {
        const pages = [];

        const left = Math.max(1, currentPage - 1);
        const right = Math.min(totalPages, currentPage + 1);

        // Always include first page
        pages.push(1);

        // Left dots
        if (left > 2) {
            pages.push("...");
        }

        // Middle pages
        for (let i = left; i <= right; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        // Right dots
        if (right < totalPages - 1) {
            pages.push("...");
        }

        // Always include last page
        if (totalPages !== 1) {
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
                            // key={page}
                            key={`${page}-${index}`}
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