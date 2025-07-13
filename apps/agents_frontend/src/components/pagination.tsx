import Link from "next/link";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

type PaginationProps = {
	previusPage: number | null;
	nextPage: number | null;
	page: number;
	totalPages: number;
};
export function PaginationComponent({
	nextPage,
	previusPage,
	page,
	totalPages,
}: PaginationProps) {
	return (
		<Pagination className="w-auto">
			<PaginationContent className="gap-3">
				<PaginationItem>
					<Button
						variant="outline"
						className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
						aria-disabled={previusPage === null ? true : undefined}
						asChild
					>
						<Link
							href={{
								pathname: "/",
								query: {
									page: previusPage,
									limit: 5,
								},
							}}
						>
							Previous
						</Link>
					</Button>
				</PaginationItem>
				<PaginationItem>
					<Button
						variant="outline"
						className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
						aria-disabled={page === totalPages ? true : undefined}
						asChild
					>
						<Link
							href={{
								pathname: "/",
								query: {
									page: nextPage,
									limit: 5,
								},
							}}
						>
							Next
						</Link>
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
