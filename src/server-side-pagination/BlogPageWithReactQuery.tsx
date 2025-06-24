import { useState } from 'react';
import { FETCH_URL } from '../constants';
import PostList from '../PostList';
import Pagination from '../Pagination';
import { useQuery } from '@tanstack/react-query';

function BlogPage() {
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const postsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const fetchPosts = async ({ queryKey }) => {
		const [_, page] = queryKey;
		const res = await fetch(
			`${FETCH_URL}?_page=${page}&_limit=${postsPerPage}`
		);
		const totalPosts = res.headers.get('X-Total-Count');
		const data = await res.json();
		return { data, totalPosts };
	};

	const { data, isLoading, Error } = useQuery({
		queryKey: ['posts', currentPage],
		queryFn: fetchPosts,
	});

	return (
		<>
			<PostList posts={posts} />
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={totalPosts / postsPerPage}
			/>
		</>
	);
}

export default BlogPage;
