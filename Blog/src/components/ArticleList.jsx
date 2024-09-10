import React, { useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle new article input changes
  const handleChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    if (!token) {
      setErrorMessage('No token found. Authorization denied.');
      return;
    }

    try {
      const response = await axios.post(
        'https://blog-web-tau-taupe.vercel.app/api/articles/',
        {
          title: newArticle.title,
          content: newArticle.content,
          tags: newArticle.tags.split(',').map((tag) => tag.trim()), 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'), 
          },
        }
      );

      if (response.status === 201) {
        setArticles([...articles, response.data]);
        setNewArticle({ title: '', content: '', tags: '' }); 
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrorMessage(`Error: ${error.response.data.message || 'Failed to add article.'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setErrorMessage('No response from the server. Please try again.');
      } else {
        console.error('Axios error:', error.message);
        setErrorMessage(`Axios error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">Add a New Article</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold"></h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newArticle.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={newArticle.content}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              rows="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={newArticle.tags}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primaryColor text-white p-3 rounded-md"
          >
            Add Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleList;
