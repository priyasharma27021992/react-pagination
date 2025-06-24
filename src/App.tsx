import './App.css';
import BlogPage from './server-side-pagination/BlogPageWithReactQuery';
// import BlogPage from './server-side-pagination/BlogPage';
// import BlogPage from './client-side-pagination/BlogPage';

function App() {
	return (
		<div className='root'>
			<h1>Blogs</h1>
			<BlogPage />
		</div>
	);
}

export default App;
