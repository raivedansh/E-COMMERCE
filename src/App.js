import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import CreatePost from './CreatePost';
import DeletePosts from './DeletePost';
import './App.css';

function App() {
	return (
		<Router>
			<div className="app">
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/create">Create Post</Link>
						</li>
						<li>
							<Link to="/delete">Delete Posts</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<CreatePost />} />
					<Route path="/delete" element={<DeletePosts />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
