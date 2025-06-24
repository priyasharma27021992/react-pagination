import type { Post } from './types';

function PostList({ posts }: { posts: Array<Post> }) {
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

export default PostList;
