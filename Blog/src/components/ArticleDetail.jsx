import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <p className="text-lg mb-4">By {article.author.name}</p>
      <p className="mb-4">{article.content}</p>
      <div className="flex flex-wrap gap-2">
        {article.tags.map(tag => (
          <span key={tag} className="bg-gray-200 p-2 rounded-md text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
