import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeletePosts.css'; // Import the CSS file for styling

function DeletePosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// Fetch posts when the component loads
		axios.get('http://localhost:5000/api/posts')
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => {
				console.error('Error fetching posts:', error);
			});
	}, []);

	const handleDelete = (postId) => {
		axios.delete(`http://localhost:5000/api/posts/${postId}`)
			.then(response => {
				// Update the state to remove the deleted post
				setPosts(posts.filter(post => post._id !== postId));
			})
			.catch(error => {
				console.error('Error deleting post:', error);
				alert('Failed to delete the post. Please try again.');
			});
	};

	return (
		<div className="delete-posts">
			<h2>Delete Posts</h2>
			{posts.length > 0 ? (
				<ul className="post-list">
					{posts.map(post => (
						<li key={post._id} className="post-item">
							<div className="post-content">
								<h3>{post.title}</h3>
								<p>{post.content}</p>
								{post.file && (
									<img src={`http://localhost:5000/uploads/${post.file}`} alt={post.title} className="post-image" />
								)}
							</div>
							<button className="delete-button" onClick={() => handleDelete(post._id)}>Delete Post</button>
						</li>
					))}
				</ul>
			) : (
				<p>No posts available to delete.</p>
			)}
		</div>
	);
}

export default DeletePosts;
