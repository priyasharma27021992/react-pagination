import { useEffect, useState } from 'react';
import { FETCH_URL } from '../constants';
import PostList from '../PostList';
import Pagination from '../Pagination';

function BlogPage() {
	const [posts, setPosts] = useState([]);
	const postsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	//client side pagination
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(FETCH_URL);
			const json = await response.json();
			setPosts(json);
		};
		fetchPosts();
	}, []);

	return (
		<>
			<PostList posts={currentPosts} />
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={posts.length / postsPerPage}
			/>
		</>
	);
}

export default BlogPage;
