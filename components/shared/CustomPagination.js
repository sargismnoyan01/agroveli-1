import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default function CustomPagination({setPage, totalPages, page}) {

  return(
      <div className="flex justify-center mt-10">
        <Pagination>
          <PaginationContent className="list-none">
            {/* Prev */}
            <PaginationItem >
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === pageNumber}
                    onClick={() => {
                      setPage(pageNumber)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page < totalPages) {
                    setPage(page + 1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

)
}