import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
};

function Pagination({
	totalPages,
	currentPage,
	setCurrentPage,
}: PaginationProps) {
	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
	return (
		<nav>
			<ul className='pagination'>
				{Array.from({ length: totalPages }, (v, i) => i + 1).map(
					(pageNumber) => {
						return (
							<li
								key={pageNumber}
								className={`page-item ${
									currentPage === pageNumber ? 'active' : ''
								}`}>
								<button onClick={() => handlePageClick(pageNumber)}>
									{pageNumber}
								</button>
							</li>
						);
					}
				)}
			</ul>
		</nav>
	);
}

export default Pagination;
