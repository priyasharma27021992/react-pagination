import { useEffect, useState } from 'react';
import './App.css';

const FETCH_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const postsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost + 1);

	//client side pagination
	// useEffect(() => {
	// 	const fetchPosts = async () => {
	// 		const response = await fetch(FETCH_URL);
	// 		const json = await response.json();
	// 		setPosts(json);
	// 	};
	// 	fetchPosts();
	// }, []);

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
	}, [currentPage, postsPerPage]);

	return (
		<div className='root'>
			<h1>Blogs</h1>
			<PostList posts={currentPosts} />
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				// totalPages={posts.length / postsPerPage}
				totalPages={totalPosts / postsPerPage}
			/>
		</div>
	);
}

function PostList({ posts }) {
	return (
		<ul className='post-list'>
			{posts.map((post) => (
				<li key={post.id}>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	);
}

function Pagination({ totalPages, currentPage, setCurrentPage }) {
	const handlePageClick = (page) => {
		setCurrentPage(page);
	};
	return (
		<nav>
			<ul className='pagination'>
				{Array.from({ length: totalPages }, (v, i) => i).map((page) => {
					return (
						<li
							key={page}
							className={`page-item ${currentPage === page ? 'active' : ''}`}>
							<button onClick={() => handlePageClick(page + 1)}>
								{page + 1}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
export default App;
