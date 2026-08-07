import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "react-router"

export function PaginationBar({ className, totalPages, currentPage }: { className?: string, totalPages: number, currentPage: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    function handlePageChange(page: number) {
        setSearchParams({ ...searchParams, page: String(page) });
    }
    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} href="#" />
                </PaginationItem>
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink onClick={() => handlePageChange(i + 1)} href="#" isActive={currentPage === i + 1}>{i + 1}</PaginationLink>
                        </PaginationItem>
                    ))
                }
                {
                    totalPages > 5 && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handlePageChange(totalPages)} href="#" isActive={currentPage === totalPages}>{totalPages}</PaginationLink>
                            </PaginationItem>
                        </>
                    )
                }
                <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
