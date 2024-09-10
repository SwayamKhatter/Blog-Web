import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleContain from './ArticleContain';
import Modal from './Modal';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [tagQuery, setTagQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://blog-web-tau-taupe.vercel.app/api/articles/');
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const filterArticles = () => {
      let filtered = articles;

      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(lowercasedQuery) ||
          article.content.toLowerCase().includes(lowercasedQuery)
        );
      }

      if (authorQuery) {
        const lowercasedAuthorQuery = authorQuery.toLowerCase();
        filtered = filtered.filter(article =>
          article.author.name.toLowerCase().includes(lowercasedAuthorQuery)
        );
      }

      if (tagQuery) {
        const lowercasedTagQuery = tagQuery.toLowerCase();
        filtered = filtered.filter(article =>
          article.tags.some(tag => tag.toLowerCase().includes(lowercasedTagQuery))
        );
      }

      setFilteredArticles(filtered);
    };

    filterArticles();
  }, [searchQuery, authorQuery, tagQuery, articles]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthorQuery(e.target.value);
  };

  const handleTagChange = (e) => {
    setTagQuery(e.target.value);
  };

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">Articles</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor mb-4"
        />
        <input
          type="text"
          placeholder="Search by author name..."
          value={authorQuery}
          onChange={handleAuthorChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor mb-4"
        />
        <input
          type="text"
          placeholder="Search by tags..."
          value={tagQuery}
          onChange={handleTagChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
            onClick={() => openModal(article)}
          >
            <ArticleContain
              id={article._id}
              title={article.title}
              description={article.content.substring(0, 100) + '...'}
              author={article.author.name}
              tags={article.tags}
              date={article.publishedDate}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        article={selectedArticle}
      />
    </div>
  );
};

export default Home;
