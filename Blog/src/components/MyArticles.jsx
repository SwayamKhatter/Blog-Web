import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleContainer from './ArticleContainer';
import { useNavigate } from 'react-router-dom';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchArticles();
    } else {
      navigate("/signin"); 
    }
  }, [navigate]); 

  const fetchArticles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/articles/my-articles', {
        headers: { 'Authorization': token },
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleEdit = async (id, title, description, tags) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ title, content: description, tags }),
      });

      const json = await response.json();
      if (response.ok) {
        // Fetch the latest articles after successful update
        fetchArticles();
      } else {
        console.error('Error editing article:', json.message);
      }
    } catch (error) {
      console.error('Error editing article:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Authorization denied.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const json = await response.json();
      if (response.ok) {
        fetchArticles();
      } else {
        console.error('Error deleting article:', json.message);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">My Articles</h1>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleContainer
            key={article._id}
            id={article._id}
            title={article.title}
            description={article.content.substring(0, 100) + '...'}
            author={article.author.name} 
            tags={article.tags}
            date={article.publishedDate}
            darkMode={darkMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyArticles;
