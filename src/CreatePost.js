import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		file: null,
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleFileChange = (event) => {
		setNewPost({ ...newPost, file: event.target.files[0] });
	};

	const handlePostSubmit = () => {
		// Validation: check if any field is empty
		if (
			newPost.title.trim() === "" ||
			newPost.content.trim() === "" ||
			!newPost.file
		) {
			setErrorMessage("All fields are required.");
			return;
		}

		setErrorMessage(""); // Clear previous errors

		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("file", newPost.file);

		axios
			.post("http://localhost:5000/api/posts", formData)
			.then((response) => {
				setNewPost({ title: "", content: "", file: null });
				setErrorMessage(""); // Clear message after successful post
			})
			.catch((error) => {
				console.error("Error creating post:", error);
				setErrorMessage("Something went wrong. Please try again.");
			});
	};

	return (
		<div className="create-post">
			<h2>Create a Post</h2>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={newPost.title}
				onChange={handleInputChange}
			/>
			<textarea
				name="content"
				placeholder="Content"
				value={newPost.content}
				onChange={handleInputChange}
			></textarea>
			<input type="file" name="file" onChange={handleFileChange} />
			<button onClick={handlePostSubmit}>Post</button>
		</div>
	);
}

export default CreatePost;
