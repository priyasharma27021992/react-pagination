import { useEffect, useState } from 'react';
import { FETCH_URL } from '../constants';
import PostList from '../PostList';
import Pagination from '../Pagination';

function BlogPage() {
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const postsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);

	//server side pagination
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`${FETCH_URL}?_page=${currentPage}&_limit=${postsPerPage}`
			);
			const json = await response.json();

			const totalPosts = response.headers.get('X-Total-Count');
			setPosts(json);
			setTotalPosts(Number(totalPosts));
		};
		fetchPosts();
	}, [currentPage]);

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
